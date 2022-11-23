import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmSqlLiteTestingModule } from '../../test-utils/typeorm-test.module';
import { Upload } from './entities/upload.entity';
import { UploadsService } from './uploads.service';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

describe('UploadsService', () => {
  let service: UploadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              // this is being super extra, in the case that you need multiple keys with the `get` method
              if (key === 'auth.secret') {
                return 'foobar';
              }
              return null;
            }),
          },
        },
        UploadsService,
      ],
      imports: [TypeOrmSqlLiteTestingModule([Upload])],
    }).compile();

    service = module.get<UploadsService>(UploadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('encrypt and decrypt file upload', () => {
    const maxSize = 256;
    const expiresInMs = 200;
    const startTime = new Date();
    const targetTable = 'merchants';
    const targetColumn = 'logo_url';

    const jwt = service.createNonce(
      maxSize,
      expiresInMs,
      targetTable,
      targetColumn
    );
    const nonce = service.decodeNonce(jwt);

    expect(nonce.id).toMatch(UUID_REGEX);
    expect(nonce.maxSizeBytes).toBe(maxSize);

    // expiry must be within 10%
    const expectedExpiryEpoch = startTime.getTime() + expiresInMs;
    expect(nonce.expires.getTime()).toBeGreaterThan(expectedExpiryEpoch * 0.9);
    expect(nonce.expires.getTime()).toBeLessThan(expectedExpiryEpoch * 1.1);
  });
});

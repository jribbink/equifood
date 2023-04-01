import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { Role } from '../../common/types/role.enum';
import { Upload } from '../../uploads/entities/upload.entity';

export class UpdateMerchantDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  banner: Upload;

  @IsNotEmpty()
  logo: Upload;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  location: Location;
}

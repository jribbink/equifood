import { IsString, IsOptional } from 'class-validator';

export class UpdateMerchantDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  phone_number: string;
}

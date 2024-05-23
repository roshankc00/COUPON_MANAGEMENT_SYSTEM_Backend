import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAffiliateLinkDto {
  @IsNumber()
  @IsNotEmpty()
  link: string;

  @IsString()
  @IsNotEmpty()
  merchant: string;

  @IsString()
  @IsNotEmpty()
  apiKey: string;
}

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAffiliateLinkDto {
  @ApiProperty({
    example: '__link__',
    description: 'Provide the link',
  })
  @IsNumber()
  @IsNotEmpty()
  link: string;

  @ApiProperty({
    example: '__merchant__',
    description: 'Provide the merchant name',
  })
  @IsString()
  @IsNotEmpty()
  merchant: string;

  @ApiProperty({
    example: 'apikey',
    description: 'Provide the apikey',
  })
  @IsString()
  @IsNotEmpty()
  apiKey: string;
}

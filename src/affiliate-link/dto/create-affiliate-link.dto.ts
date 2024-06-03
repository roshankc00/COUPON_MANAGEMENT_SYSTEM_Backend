import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';

export class CreateAffiliateLinkDto {
  @ApiProperty({
    example: '__link__',
    description: 'Provide the link',
  })
  @IsString()
  @IsNotEmpty()
  link: string;

  @ApiProperty({
    example: '__link__',
    description: 'Provide the link',
  })
  @IsString()
  @IsNotEmpty()
  tagLine: string;

  @ApiProperty({
    example: '__link__',
    description: 'Provide the link',
  })
  @IsNumber()
  @IsNotEmpty()
  cashbackAmountPer: number;

  @IsNumber()
  @IsNotEmpty()
  storeId: number;

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
  @Optional()
  apiKey: string;

  @Optional()
  apiLink: string;
}

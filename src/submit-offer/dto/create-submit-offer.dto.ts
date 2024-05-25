import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { STATUS_ENUM } from 'src/common/enums/status.enum';
export class CreateSubmitOfferDto {
  @ApiProperty({
    example: 'code---',
    description: 'Provide the code(optional)',
  })
  @IsString()
  @Optional()
  code: string;

  @ApiProperty({
    example: 'url----',
    description: 'Provide the url',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    example: '50% off in all deal',
    description: 'Provide the tagline',
  })
  @IsString()
  @IsNotEmpty()
  tagLine: string;

  @ApiProperty({
    example: '2032-3-23',
    description: 'Provide the startDate',
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    example: '2013-2-23',
    description: 'Provide the expireDate',
  })
  @IsDate()
  @Type(() => Date)
  expireDate: Date;

  @ApiProperty({
    example: 'true',
    description: 'Provide the isDeal',
  })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsNotEmpty()
  isDeal: boolean;

  @ApiProperty({
    example: 'status',
    description: 'Provide the status',
  })
  @IsNotEmpty()
  @IsEnum(STATUS_ENUM)
  status: STATUS_ENUM;
}

import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { STATUS_ENUM } from 'src/common/enums/status.enum';
import { Column } from 'typeorm';

export class CreateSubmitOfferDto {
  @IsString()
  @Optional()
  code: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  tagLine: string;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  expireDate: Date;

  @IsBoolean()
  @IsNotEmpty()
  isDeal: boolean;

  @IsNotEmpty()
  @IsEnum(STATUS_ENUM)
  status: STATUS_ENUM;
}

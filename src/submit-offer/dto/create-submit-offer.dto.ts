import { Optional } from '@nestjs/common';
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

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsNotEmpty()
  isDeal: boolean;

  @IsNotEmpty()
  @IsEnum(STATUS_ENUM)
  status: STATUS_ENUM;
}

import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreatePurchaseDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsNumber()
  @IsNotEmpty()
  affiliateLinkId: number;
}

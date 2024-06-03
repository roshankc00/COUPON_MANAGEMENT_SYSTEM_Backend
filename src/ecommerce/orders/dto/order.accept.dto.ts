import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AcceptOrderDto {
  @IsNumber()
  @IsNotEmpty()
  licenseId: number;
}

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InsertTransectionIdDto {
  @IsNumber()
  @IsNotEmpty()
  orderId: number;
  @IsString()
  @IsNotEmpty()
  transectionId: string;
}

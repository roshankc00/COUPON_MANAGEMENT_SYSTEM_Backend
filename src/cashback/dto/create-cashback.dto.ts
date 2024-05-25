import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCashbackDto {
  @ApiProperty({
    example: '100',
    description: 'Provide the amount',
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: '1',
    description: 'Provide the purchaseId',
  })
  @IsNumber()
  @IsNotEmpty()
  purchaseId: number;
}

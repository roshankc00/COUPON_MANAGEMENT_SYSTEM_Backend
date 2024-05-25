import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreatePurchaseDto {
  @ApiProperty({
    example: '100',
    description: 'Provide the amount',
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: '2024-2-3',
    description: 'Provide the startDate',
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    example: '1',
    description: 'affiliateLinkId',
  })
  @IsNumber()
  @IsNotEmpty()
  affiliateLinkId: number;
}

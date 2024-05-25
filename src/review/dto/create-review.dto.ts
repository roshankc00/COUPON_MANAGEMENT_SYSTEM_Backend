import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    example: '1',
    description: 'Provide the coupon Id',
  })
  @IsNumber()
  @IsNotEmpty()
  couponId: number;

  @ApiProperty({
    example: '5',
    description: 'Provide the rating',
  })
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    example: '----content-----',
    description: 'Provide the content',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}

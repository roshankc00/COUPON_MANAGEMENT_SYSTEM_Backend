import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty({
    example: 'Roshan karki',
    description: 'Provide the name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'roshan@gmail.com',
    description: 'Provide the email',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'url--------',
    description: 'Provide the companyUrl',
  })
  @IsString()
  @IsOptional()
  companyUrl: string;

  @ApiProperty({
    example: 'message---',
    description: 'Provide the message',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}

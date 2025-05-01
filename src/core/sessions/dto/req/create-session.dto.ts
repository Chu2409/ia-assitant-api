import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator'

export class CreateSessionDto {
  @ApiProperty({
    description: 'Session title',
    example: 'My first session',
  })
  @IsNotEmpty({ message: 'title is required' })
  @IsString({ message: 'title must be a string' })
  @Length(2, 50, { message: 'title must be between 2 and 50 characters' })
  title: string

  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  @IsNumber({}, { message: 'userId must be a number' })
  @IsPositive({ message: 'userId must be a positive number' })
  userId: number
}

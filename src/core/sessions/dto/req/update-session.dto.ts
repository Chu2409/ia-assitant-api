import { PartialType } from '@nestjs/mapped-types'
import { CreateSessionDto } from './create-session.dto'
import { ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsString,
  Length,
  IsNumber,
  IsPositive,
} from 'class-validator'

export class UpdateSessionDto extends PartialType(CreateSessionDto) {
  @ApiPropertyOptional({
    description: 'Session title',
    example: 'My first session',
  })
  @IsNotEmpty({ message: 'title is required' })
  @IsString({ message: 'title must be a string' })
  @Length(2, 50, { message: 'title must be between 2 and 50 characters' })
  title?: string

  @ApiPropertyOptional({
    description: 'User ID',
    example: 1,
  })
  @IsNumber({}, { message: 'userId must be a number' })
  @IsPositive({ message: 'userId must be a positive number' })
  userId?: number
}

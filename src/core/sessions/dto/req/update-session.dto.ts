import { PartialType } from '@nestjs/mapped-types'
import { CreateSessionDto } from './create-session.dto'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, Length } from 'class-validator'

export class UpdateSessionDto extends PartialType(CreateSessionDto) {
  @ApiPropertyOptional({
    description: 'Session title',
    example: 'My first session',
  })
  @IsString({ message: 'title must be a string' })
  @Length(2, 50, { message: 'title must be between 2 and 50 characters' })
  @IsOptional()
  title?: string
}

import { PartialType } from '@nestjs/swagger'
import { CreateTagReqDto } from './create-tag.dto'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, Length } from 'class-validator'
export class UpdateTagReqDto extends PartialType(CreateTagReqDto) {
  @ApiPropertyOptional({
    description: 'Tag name',
    example: 'nestjs',
  })
  @IsOptional()
  @IsString({ message: 'Tag name must be a string' })
  @Length(1, 20, { message: 'Tag name must be between 1 and 20 characters' })
  name?: string

  @ApiPropertyOptional({
    description: 'Tag color',
    example: '#ff0000',
  })
  @IsOptional()
  @IsString({ message: 'Tag color must be a string' })
  color?: string
}

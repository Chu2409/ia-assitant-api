import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, Length } from 'class-validator'

export class CreateTagReqDto {
  @ApiProperty({
    description: 'Tag name',
    example: 'nestjs',
  })
  @IsString({ message: 'Tag name must be a string' })
  @Length(1, 20, { message: 'Tag name must be between 1 and 20 characters' })
  name: string

  @ApiPropertyOptional({
    description: 'Tag color',
    example: '#ff0000',
  })
  @IsString({ message: 'Tag color must be a string' })
  @IsOptional()
  color?: string
}

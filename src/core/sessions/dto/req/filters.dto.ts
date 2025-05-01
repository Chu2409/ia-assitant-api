import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { BaseParamsDto } from 'src/common/dtos/base-params.dto'

export class SessionFiltersDto extends BaseParamsDto {
  @ApiProperty({
    description: 'Search by title',
    example: 'My first session',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string
}

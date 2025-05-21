import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { BaseParamsDto } from 'src/common/dtos/req/base-params.dto'

export class SessionFiltersDto extends BaseParamsDto {
  @ApiPropertyOptional({
    description: 'Search by title',
    example: 'My first session',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string
}

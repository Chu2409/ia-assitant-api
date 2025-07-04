import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { BaseParamsDto } from 'src/common/dtos/req/base-params.dto'

export class UserFiltersDto extends BaseParamsDto {
  @ApiPropertyOptional({
    description: 'Search by name or email',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  search?: string

  @ApiPropertyOptional({
    description: 'Organization id',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  organizationId?: number
}

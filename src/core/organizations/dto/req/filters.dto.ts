import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { BaseParamsDto } from 'src/common/dtos/req/base-params.dto'

export class OrganizationFiltersDto extends BaseParamsDto {
  @ApiPropertyOptional({
    description: 'Search term for filtering organizations',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string
}

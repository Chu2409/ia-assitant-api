import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { BaseParamsDto } from 'src/common/dtos/base-params.dto'

export class OrganizationFiltersDto extends BaseParamsDto {
  @ApiProperty({
    description: 'Search term for filtering organizations',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string
}

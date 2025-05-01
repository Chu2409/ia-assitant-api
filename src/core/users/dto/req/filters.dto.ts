import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { BaseParamsDto } from 'src/common/dtos/base-params.dto'

export class UserFiltersDto extends BaseParamsDto {
  @ApiProperty({
    description: 'Search by name or email',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  search?: string
}

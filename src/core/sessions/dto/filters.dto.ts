import { IsOptional, IsString } from 'class-validator'
import { BaseParamsDto } from 'src/common/dtos/base-params.dto'

export class SessionFiltersDto extends BaseParamsDto {
  @IsOptional()
  @IsString()
  search?: string
}

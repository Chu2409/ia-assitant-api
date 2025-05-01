import { PartialType } from '@nestjs/mapped-types'
import { CreateOrganizationDto } from './create-organization.dto'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {
  @ApiPropertyOptional({
    description: 'Name of the organization',
    example: 'My Organization',
  })
  @IsOptional()
  @IsString({ message: 'name must be a string' })
  @Length(3, 50, { message: 'name must be between 3 and 50 characters' })
  name?: string

  @ApiPropertyOptional({
    description: 'Domain of the organization',
    example: 'my-organization.com',
  })
  @IsOptional()
  @IsString({ message: 'domain must be a string' })
  @IsNotEmpty({ message: 'domain must not be empty' })
  @Length(5, 200, {
    message: 'domain must be between 10 and 200 characters',
  })
  domain?: string
}

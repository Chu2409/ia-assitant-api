import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateOrganizationDto {
  @ApiProperty({
    description: 'Name of the organization',
    example: 'My Organization',
  })
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name must not be empty' })
  @Length(3, 50, { message: 'name must be between 3 and 50 characters' })
  name: string

  @ApiProperty({
    description: 'Domain of the organization',
    example: 'my-organization.com',
  })
  @IsString({ message: 'domain must be a string' })
  @IsNotEmpty({ message: 'domain must not be empty' })
  @Length(5, 200, {
    message: 'domain must be between 10 and 200 characters',
  })
  domain: string
}

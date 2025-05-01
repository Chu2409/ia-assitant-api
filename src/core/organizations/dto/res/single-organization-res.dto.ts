import { ApiProperty } from '@nestjs/swagger'

export class SingleOrganizationResDto {
  @ApiProperty({
    description: 'The unique identifier of the organization',
    example: 1,
  })
  id: number

  @ApiProperty({
    description: 'The name of the organization',
    example: 'My Organization',
  })
  name: string

  @ApiProperty({
    description: 'The description of the organization',
    example: 'This is my organization',
  })
  domain: string
}

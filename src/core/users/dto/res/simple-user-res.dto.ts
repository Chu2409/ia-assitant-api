import { ApiProperty } from '@nestjs/swagger'

export class SimpleUserResDto {
  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  id: number

  @ApiProperty({
    description: 'User email',
    example: 'johndoe@test.org',
  })
  email: string

  @ApiProperty({
    description: 'User name',
    example: 'John',
  })
  name: string

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  lastName: string
}

import { ApiProperty } from '@nestjs/swagger'
import { SimpleUserResDto } from 'src/core/users/dto/res/simple-user-res.dto'

export class OrganizationUsersResDto {
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
    example: 'test@domain.com',
  })
  domain: string

  @ApiProperty({
    description: 'The list of users in the organization',
    type: [SimpleUserResDto],
  })
  users: SimpleUserResDto[]
}

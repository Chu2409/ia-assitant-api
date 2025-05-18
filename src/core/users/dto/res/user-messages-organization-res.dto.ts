import { ApiProperty } from '@nestjs/swagger'
import { UserRole } from '@prisma/client'
import { SingleOrganizationResDto } from 'src/core/organizations/dto/res/single-organization-res.dto'
import { SingleSessionResDto } from 'src/core/sessions/dto/res/simple-session-res.dto'

export class UserMessagesOrganizationResDto {
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

  @ApiProperty({
    description: 'User role',
    example: UserRole.USER,
    enum: UserRole,
  })
  role: UserRole

  @ApiProperty({
    description: 'User chats',
    type: [SingleSessionResDto],
  })
  sessions: SingleSessionResDto[]

  @ApiProperty({
    description: 'User organization',
    type: SingleOrganizationResDto,
  })
  organization: SingleOrganizationResDto
}

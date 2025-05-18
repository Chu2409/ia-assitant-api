import { ApiProperty } from '@nestjs/swagger'
import { UserRole } from '@prisma/client'
import { SimpleUserResDto } from 'src/core/users/dto/res/simple-user-res.dto'

export class SignInResDto {
  @ApiProperty({
    description: 'JWT token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzQ2MDE3MTY2LCJleHAiOjE3NDYwMjQzNjZ9.cZwdsfG5wYTWSgCnuSBCnB9GhJc24UksisDpx5nlaZI',
  })
  token: string

  @ApiProperty({
    description: 'User data',
    type: SimpleUserResDto,
  })
  user: SimpleUserResDto

  @ApiProperty({
    enum: UserRole,
    description: 'User role',
    example: UserRole.USER,
  })
  role: UserRole
}

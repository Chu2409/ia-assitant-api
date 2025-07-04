import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

export class SignInDto {
  @ApiProperty({
    description: 'email',
    example: 'dzhu2409@test.org',
  })
  @IsEmail({}, { message: 'email must be a valid email' })
  email: string

  @ApiProperty({
    description: 'password',
    example: '123456',
  })
  @IsString({ message: 'password must be a string' })
  @Length(6, 50, { message: 'password must be between 6 and 50 characters' })
  password: string
}

import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator'

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'email is required' })
  email: string

  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  @Length(8, 50, { message: 'password must be between 8 and 50 characters' })
  password: string

  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name must be a string' })
  @Length(2, 50, { message: 'name must be between 2 and 50 characters' })
  name: string

  @IsNotEmpty({ message: 'lastName is required' })
  @IsString({ message: 'lastName must be a string' })
  @Length(2, 50, { message: 'lastName must be between 2 and 50 characters' })
  lastName: string

  @IsNumber({}, { message: 'organizationId must be a number' })
  @IsPositive({ message: 'organizationId must be a positive number' })
  organizationId: number
}

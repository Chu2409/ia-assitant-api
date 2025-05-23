import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { UserRole } from '@prisma/client'
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'johndoe@test.org',
  })
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'email is required' })
  email: string

  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  @Length(5, 50, { message: 'password must be between 8 and 50 characters' })
  password: string

  @ApiProperty({
    description: 'User name',
    example: 'John',
  })
  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name must be a string' })
  @Length(2, 50, { message: 'name must be between 2 and 50 characters' })
  name: string

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @IsNotEmpty({ message: 'lastName is required' })
  @IsString({ message: 'lastName must be a string' })
  @Length(2, 50, { message: 'lastName must be between 2 and 50 characters' })
  lastName: string

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'User active status',
    example: true,
    default: true,
  })
  isActive?: boolean

  @ApiPropertyOptional({
    description: 'User role',
    example: UserRole.USER,
    enum: UserRole,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole

  @ApiPropertyOptional({
    description: 'Organization ID',
    example: 1,
  })
  @IsNumber({}, { message: 'organizationId must be a number' })
  @IsPositive({ message: 'organizationId must be a positive number' })
  @IsOptional()
  organizationId?: number
}

import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsEmail,
  IsString,
  Length,
  IsNumber,
  IsPositive,
  IsBoolean,
  IsOptional,
  IsEnum,
} from 'class-validator'
import { UserRole } from '@prisma/client'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: 'User email',
    example: 'johndoe@test.org',
  })
  @IsEmail({}, { message: 'Invalid email' })
  @IsOptional()
  email?: string

  @ApiPropertyOptional({
    description: 'User password',
    example: 'password123',
  })
  @IsOptional()
  @IsString({ message: 'password must be a string' })
  @Length(5, 50, { message: 'password must be between 8 and 50 characters' })
  password?: string

  @ApiPropertyOptional({
    description: 'User name',
    example: 'John',
  })
  @IsOptional()
  @IsString({ message: 'name must be a string' })
  @Length(2, 50, { message: 'name must be between 2 and 50 characters' })
  name?: string

  @ApiPropertyOptional({
    description: 'User last name',
    example: 'Doe',
  })
  @IsOptional()
  @IsString({ message: 'lastName must be a string' })
  @Length(2, 50, { message: 'lastName must be between 2 and 50 characters' })
  lastName?: string

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

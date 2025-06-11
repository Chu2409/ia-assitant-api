import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/req/create-user.dto'
import { UpdateUserDto } from './dto/req/update-user.dto'
import { UserFiltersDto } from './dto/req/filters.dto'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import {
  ApiPaginatedResponse,
  ApiStandardResponse,
} from 'src/common/decorators/api-standard-response.decorator'
import { SimpleUserResDto } from './dto/res/simple-user-res.dto'
import { UserMessagesOrganizationResDto } from './dto/res/user-messages-organization-res.dto'
import { GetUser } from '../auth/decorators/get-user.decorator'
import { User } from '@prisma/client'
import { Auth } from '../auth/decorators/auth.decorator'

@Controller('users')
@Auth()
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('me')
  @ApiOperation({
    summary: 'Get user by token',
  })
  @ApiStandardResponse(UserMessagesOrganizationResDto, HttpStatus.OK)
  findMe(@GetUser() user: User) {
    return this.service.findOne(user.id)
  }

  @Post()
  @ApiOperation({
    summary: 'Create user',
  })
  @ApiStandardResponse(Boolean, HttpStatus.OK)
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto)
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiPaginatedResponse(SimpleUserResDto, HttpStatus.OK)
  findAll(@Query() paginationDto: UserFiltersDto) {
    return this.service.findAll(paginationDto)
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by id',
  })
  @ApiStandardResponse(UserMessagesOrganizationResDto, HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update user',
  })
  @ApiStandardResponse(Boolean, HttpStatus.OK)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user',
  })
  @ApiStandardResponse(Boolean, HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id)
  }
}

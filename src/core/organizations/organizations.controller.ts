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
import { OrganizationsService } from './organizations.service'
import { CreateOrganizationDto } from './dto/req/create-organization.dto'
import { OrganizationFiltersDto } from './dto/req/filters.dto'
import { UpdateOrganizationDto } from './dto/req/update-organization.dto'
import { ApiOperation } from '@nestjs/swagger'
import { SingleOrganizationResDto } from './dto/res/single-organization-res.dto'
import {
  ApiPaginatedResponse,
  ApiStandardResponse,
} from 'src/common/decorators/api-standard-response.decorator'
import { OrganizationUsersResDto } from './dto/res/organization-users-res.dto'

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly service: OrganizationsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new organization',
  })
  @ApiStandardResponse(Boolean, HttpStatus.CREATED)
  create(@Body() dto: CreateOrganizationDto) {
    return this.service.create(dto)
  }

  @Get()
  @ApiOperation({
    summary: 'Get all organizations',
  })
  @ApiPaginatedResponse(SingleOrganizationResDto)
  findAll(@Query() paginationDto: OrganizationFiltersDto) {
    return this.service.findAll(paginationDto)
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a single organization by ID',
  })
  @ApiStandardResponse(OrganizationUsersResDto)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an organization by ID',
  })
  @ApiStandardResponse(Boolean)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrganizationDto,
  ) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an organization by ID',
  })
  @ApiStandardResponse(Boolean)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id)
  }
}

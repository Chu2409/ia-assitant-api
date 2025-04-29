import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { CreateOrganizationDto } from './dto/create-organization.dto'
import { UpdateOrganizationDto } from './dto/update-organization.dto'
import { PrismaService } from 'src/global/prisma/prisma.service'
import { DisplayableException } from 'src/common/exceptions/displayable.exception'
import { OrganizationFiltersDto } from './dto/filters.dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class OrganizationsService {
  constructor(private readonly prismaService: PrismaService) {}

  private whereClause = (search?: string): Prisma.OrganizationWhereInput => ({
    OR: [
      {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        domain: {
          contains: search,
          mode: 'insensitive',
        },
      },
    ],
  })

  include: Prisma.SelectSubset<
    Prisma.OrganizationInclude,
    Prisma.OrganizationInclude
  > = {
    users: true,
  }

  async create({ domain, name }: CreateOrganizationDto) {
    const alreadyExists = await this.prismaService.organization.findFirst({
      where: {
        OR: [{ name }, { domain }],
      },
    })

    if (alreadyExists)
      throw new DisplayableException(
        'La organización ya existe',
        HttpStatus.BAD_REQUEST,
      )

    const entity = await this.prismaService.organization.create({
      data: {
        name,
        domain,
      },
    })

    return entity
  }

  async findAll({ limit, page, search }: OrganizationFiltersDto) {
    const whereClause: Prisma.OrganizationWhereInput = {
      ...this.whereClause(search),
    }

    const [entities, total] = await Promise.all([
      this.prismaService.organization.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where: whereClause,
        include: this.include,
        orderBy: {
          id: 'desc',
        },
      }),
      this.prismaService.organization.count({
        where: whereClause,
      }),
    ])

    return {
      records: entities,
      total,
      limit,
      page,
      pages: Math.ceil(total / limit),
    }
  }

  async findOne(id: number) {
    const entity = await this.prismaService.organization.findUnique({
      where: {
        id,
      },
      include: this.include,
    })

    if (!entity)
      throw new NotFoundException(`Organization with id ${id} not found`)

    return entity
  }

  async update(id: number, dto: UpdateOrganizationDto) {
    await this.findOne(id)

    const inventory = await this.prismaService.organization.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
      include: this.include,
    })

    return inventory
  }

  async remove(id: number) {
    const exists = await this.prismaService.user.findFirst({
      where: {
        organizationId: id,
      },
    })

    if (exists)
      throw new DisplayableException(
        'No se puede eliminar la organización porque tiene usuarios asociados',
        HttpStatus.BAD_REQUEST,
      )

    return this.prismaService.organization.delete({
      where: {
        id,
      },
    })
  }
}

import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from 'src/global/prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { DisplayableException } from 'src/common/exceptions/displayable.exception'
import { hashPassword } from 'src/common/utils/encrypter'
import { UserFiltersDto } from './dto/filters.dto'

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  private whereClause = (search?: string): Prisma.UserWhereInput => ({
    OR: [
      {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        lastName: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        email: {
          contains: search,
          mode: 'insensitive',
        },
      },
    ],
  })

  include: Prisma.SelectSubset<Prisma.UserInclude, Prisma.UserInclude> = {
    sessions: {
      include: {
        messages: true,
      },
    },
  }

  async create({
    email,
    name,
    lastName,
    password,
    organizationId,
  }: CreateUserDto) {
    const alreadyExists = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email }],
      },
    })

    if (alreadyExists)
      throw new DisplayableException(
        'El usuario ya existe',
        HttpStatus.BAD_REQUEST,
      )

    const entity = await this.prismaService.user.create({
      data: {
        email,
        password: hashPassword(password),
        name,
        lastName,
        organizationId,
      },
    })

    return entity
  }

  async findAll({ limit, page, search }: UserFiltersDto) {
    const whereClause: Prisma.UserWhereInput = {
      ...this.whereClause(search),
    }

    const [entities, total] = await Promise.all([
      this.prismaService.user.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where: whereClause,
        orderBy: {
          id: 'desc',
        },
      }),
      this.prismaService.user.count({
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
    const entity = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: this.include,
    })

    if (!entity) throw new NotFoundException(`User with id ${id} not found`)

    return entity
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.findOne(id)

    const inventory = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...dto,
        password: dto.password ? hashPassword(dto.password) : undefined,
      },
      include: this.include,
    })

    return inventory
  }

  async remove(id: number) {
    const exists = await this.prismaService.session.findFirst({
      where: {
        userId: id,
      },
    })

    if (exists)
      throw new DisplayableException(
        'No se puede eliminar el usuario porque tiene sesiones activas',
        HttpStatus.BAD_REQUEST,
      )

    return this.prismaService.user.delete({
      where: {
        id,
      },
    })
  }
}

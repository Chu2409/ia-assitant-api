import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/req/create-user.dto'
import { UpdateUserDto } from './dto/req/update-user.dto'
import { PrismaService } from 'src/global/prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { DisplayableException } from 'src/common/exceptions/displayable.exception'
import { hashPassword } from 'src/common/utils/encrypter'
import { UserFiltersDto } from './dto/req/filters.dto'

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  private whereClause = (search?: string): Prisma.UserWhereInput => ({
    ...(search && {
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
    }),
  })

  private include: Prisma.SelectSubset<Prisma.UserInclude, Prisma.UserInclude> =
    {
      sessions: true,
      organization: true,
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
      omit: {
        password: true,
        organizationId: true,
      },
    })

    return !!entity
  }

  async findAll({ limit, page, search, organizationId }: UserFiltersDto) {
    const whereClause: Prisma.UserWhereInput = {
      ...this.whereClause(search),
    }

    if (organizationId) {
      whereClause.organizationId = organizationId
    }

    const [entities, total] = await Promise.all([
      this.prismaService.user.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where: whereClause,
        orderBy: {
          id: 'desc',
        },
        omit: {
          password: true,
          organizationId: true,
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
      omit: {
        password: true,
        organizationId: true,
      },
    })

    if (!entity) throw new NotFoundException(`User with id ${id} not found`)

    return entity
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.findOne(id)

    if (dto.email) {
      const alreadyExists = await this.prismaService.user.findFirst({
        where: {
          email: dto.email,
          id: {
            not: id,
          },
        },
      })

      if (alreadyExists)
        throw new DisplayableException(
          'Ya existe un usuario con ese email',
          HttpStatus.BAD_REQUEST,
        )
    }

    const entity = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...dto,
        password: dto.password ? hashPassword(dto.password) : undefined,
      },
      omit: {
        password: true,
        organizationId: true,
      },
    })

    return !!entity
  }

  async remove(id: number) {
    await this.findOne(id)

    const deleted = await this.prismaService.user.delete({
      where: {
        id,
      },
    })

    return !!deleted
  }
}

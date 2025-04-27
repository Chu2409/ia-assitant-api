import { HttpStatus, Injectable } from '@nestjs/common'
import { SignInDto } from './dto/sign-in.dto'
import { JwtService } from '@nestjs/jwt'
import { IJwtPayload } from './types/jwt-payload.interface'
import { DisplayableException } from 'src/common/exceptions/displayable.exception'
import { comparePassword } from 'src/common/utils/encrypter'
import { PrismaService } from 'src/global/prisma/prisma.service'
import { Admin, User } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: SignInDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    })

    if (!user) {
      const admin = await this.prismaService.admin.findUnique({
        where: { email },
      })

      if (!admin) {
        throw new DisplayableException(
          'Usuario no encontrado',
          HttpStatus.NOT_FOUND,
        )
      }

      this.verifyPassword(password, admin.password)

      return {
        token: this.createToken({ id: admin.id, isAdmin: true }),
        user: admin,
      }
    }

    this.verifyPassword(password, user.password)

    return {
      token: this.createToken({ id: user.id, isAdmin: false }),
      user,
    }
  }

  async isAdmin(id: number): Promise<boolean> {
    const admin = await this.prismaService.admin.findUnique({
      where: { id },
    })
    return !!admin
  }

  async validateUser(
    id: number,
    isAdmin: boolean,
  ): Promise<User | Admin | null> {
    if (isAdmin) {
      return await this.prismaService.admin.findUnique({ where: { id } })
    }
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    })
  }

  private verifyPassword(password: string, userPassword: string) {
    const isPasswordValid = comparePassword(password, userPassword)

    if (!isPasswordValid)
      throw new DisplayableException(
        'Creedenciales incorrectas',
        HttpStatus.BAD_REQUEST,
      )

    return isPasswordValid
  }

  private createToken = (payload: IJwtPayload) => {
    return this.jwtService.sign(payload)
  }

  verifyToken = (token: string) => {
    try {
      return this.jwtService.verify(token)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new DisplayableException('Token inválido', HttpStatus.UNAUTHORIZED)
    }
  }
}

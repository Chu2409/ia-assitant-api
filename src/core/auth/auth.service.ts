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

      return this.createToken({
        id: admin.id,
        email: admin.email,
        isAdmin: true,
      })
    }

    this.verifyPassword(password, user.password)

    return this.createToken({
      id: user.id,
      email: user.email,
      isAdmin: false,
    })
  }

  async isAdmin(email: string): Promise<boolean> {
    const admin = await this.prismaService.admin.findUnique({
      where: { email },
    })
    return !!admin
  }

  async validateUser(
    email: string,
    isAdmin: boolean,
  ): Promise<User | Admin | null> {
    if (isAdmin) {
      return await this.prismaService.admin.findUnique({ where: { email } })
    }
    return await this.prismaService.user.findUnique({
      where: {
        email,
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
}

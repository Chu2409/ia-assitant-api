import { HttpStatus, Injectable } from '@nestjs/common'
import { SignInDto } from './dto/req/sign-in.dto'
import { JwtService } from '@nestjs/jwt'
import { IJwtPayload } from './types/jwt-payload.interface'
import { DisplayableException } from 'src/common/exceptions/displayable.exception'
import { comparePassword } from 'src/common/utils/encrypter'
import { PrismaService } from 'src/global/prisma/prisma.service'

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

    if (!user)
      throw new DisplayableException(
        'Credenciales incorrectas',
        HttpStatus.NOT_FOUND,
      )

    this.verifyPassword(password, user.password)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, organizationId, ...userWithoutPassword } = user

    return {
      token: this.createToken({ id: user.id, role: user.role }),
      user: userWithoutPassword,
      role: user.role,
    }
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

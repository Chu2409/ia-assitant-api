import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { IJwtPayload } from '../types/jwt-payload.interface'
import { User } from '@prisma/client'
import { Request } from 'express'
import { CustomConfigService } from 'src/global/config/config.service'
import { PrismaService } from 'src/global/prisma/prisma.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: CustomConfigService,
    private readonly prismaService: PrismaService,
  ) {
    super({
      secretOrKey: configService.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  authenticate(req: Request, options?: unknown): void {
    if (!req.headers.authorization) {
      throw new UnauthorizedException('Token not found')
    }

    super.authenticate(req, options)
  }

  async validate({ id }: IJwtPayload): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    })

    if (!user) throw new UnauthorizedException('Token not valid')

    return user
  }
}

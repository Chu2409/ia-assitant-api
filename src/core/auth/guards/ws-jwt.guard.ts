import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Socket } from 'socket.io'

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient()
    const token = client.handshake.auth.token as string

    if (!token) throw new UnauthorizedException('Token no proporcionado')

    try {
      const payload = this.jwtService.verify(token)
      client.data.user = payload

      return true
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new UnauthorizedException('Invalid token')
    }
  }
}

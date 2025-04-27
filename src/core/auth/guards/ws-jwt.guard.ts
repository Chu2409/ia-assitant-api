import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Socket } from 'socket.io'
import { AuthService } from '../auth.service'
import { ChatGateway } from 'src/core/chat/chat.gateway'

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly chatGateway: ChatGateway,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient()
    const token = client.handshake.query.token

    if (!token) throw new UnauthorizedException('Token no proporcionado')

    try {
      const payload = this.authService.verifyToken(token as string)
      client.data.user = payload

      return true
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new UnauthorizedException('Invalid token')
    }
  }
}

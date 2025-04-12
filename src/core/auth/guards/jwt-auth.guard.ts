import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ExecutionContext } from '@nestjs/common'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized access')
    }
    return user
  }
}

import {
  BadRequestException,
  CanActivate,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { META_ROLES } from '../decorators/role-protected.decorator'
import { User, UserRole } from '@prisma/client'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: UserRole[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    )

    if (!validRoles) return true
    if (validRoles.length === 0) return true

    const req = context.switchToHttp().getRequest()
    const userReq: User | null = req.user

    if (!userReq) throw new BadRequestException('User not found')

    // for (const role of userReq.userType) {
    //   if (validRoles.includes(role as string)) {
    //     return true
    //   }
    // }

    if (validRoles.includes(userReq.role)) return true

    throw new ForbiddenException(
      `User ${userReq.email} need a valid role: [${validRoles.join(', ')}]`,
    )
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized access')
    }
    return user
  }
}

import { applyDecorators, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { WsJwtGuard } from '../guards/ws-jwt.guard'
import { RoleProtected } from './role-protected.decorator'
import { UserRole } from '@prisma/client'
import { AuthGuard } from '@nestjs/passport'

export function Auth(...roles: UserRole[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), JwtAuthGuard),
  )
}

export function WsAuth() {
  return applyDecorators(UseGuards(WsJwtGuard))
}

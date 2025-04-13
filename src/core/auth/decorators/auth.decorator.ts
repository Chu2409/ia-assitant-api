import { applyDecorators, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { AdminGuard } from '../guards/admin.guard'
import { WsJwtGuard } from '../guards/ws-jwt.guard'

export function Auth() {
  return applyDecorators(UseGuards(JwtAuthGuard))
}

export function WsAuth() {
  return applyDecorators(UseGuards(WsJwtGuard))
}

export function AdminAuth() {
  return applyDecorators(UseGuards(JwtAuthGuard, AdminGuard))
}

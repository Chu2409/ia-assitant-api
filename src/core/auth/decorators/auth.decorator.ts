import { applyDecorators, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { AdminGuard } from '../guards/admin.guard'

export function Auth() {
  return applyDecorators(UseGuards(JwtAuthGuard))
}

export function AdminAuth() {
  return applyDecorators(UseGuards(JwtAuthGuard, AdminGuard))
}

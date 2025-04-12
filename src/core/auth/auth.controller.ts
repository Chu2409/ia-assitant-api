import { Body, Controller, Get, HttpCode, Post, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/sign-in.dto'
import { AdminAuth } from 'src/core/auth/decorators/auth.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: SignInDto) {
    return this.service.login(dto)
  }

  @AdminAuth()
  @Get('me')
  getProfile(@Request() req) {
    const user = req.user

    return user
  }
}

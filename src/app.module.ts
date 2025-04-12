import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './core/auth/auth.module'
import { CustomConfigModule } from './global/config/config.module'
import { PrismaModule } from './global/prisma/prisma.module'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { PrismaService } from './global/prisma/prisma.service'
import { CustomConfigService } from './global/config/config.service'

@Module({
  imports: [AuthModule, CustomConfigModule, PrismaModule],
  providers: [
    AppService,
    ResponseInterceptor,
    PrismaService,
    CustomConfigService,
  ],
  controllers: [AppController],
})
export class AppModule {}

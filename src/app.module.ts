import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './core/auth/auth.module'
import { CustomConfigModule } from './global/config/config.module'
import { PrismaModule } from './global/prisma/prisma.module'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { CustomConfigService } from './global/config/config.service'
import { IaModule } from './core/ia/ia.module'
import { ChatModule } from './core/chat/chat.module'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    AuthModule,
    CustomConfigModule,
    PrismaModule,
    IaModule,
    ChatModule,
    HttpModule.registerAsync({
      global: true,
      imports: [CustomConfigModule],
      inject: [CustomConfigService],
      useFactory: (configService: CustomConfigService) => ({
        baseURL: configService.env.IA_API_URL,
        headers: {
          Authorization: `Bearer ${configService.env.IA_API_KEY}`,
        },
      }),
    }),
  ],
  providers: [AppService, ResponseInterceptor],
  controllers: [AppController],
})
export class AppModule {}

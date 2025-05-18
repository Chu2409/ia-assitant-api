import { Module } from '@nestjs/common'
import { AuthModule } from './core/auth/auth.module'
import { CustomConfigModule } from './global/config/config.module'
import { PrismaModule } from './global/prisma/prisma.module'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { CustomConfigService } from './global/config/config.service'
import { IaModule } from './core/ia/ia.module'
import { ChatModule } from './core/chat/chat.module'
import { HttpModule } from '@nestjs/axios'
import { OrganizationsModule } from './core/organizations/organizations.module'
import { UsersModule } from './core/users/users.module'
import { SessionsModule } from './core/sessions/sessions.module'
import { TagsModule } from './core/tags/tags.module'
import { NotesModule } from './core/notes/notes.module'

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
    OrganizationsModule,
    UsersModule,
    SessionsModule,
    TagsModule,
    NotesModule,
  ],
  providers: [ResponseInterceptor],
})
export class AppModule {}

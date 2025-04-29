import { Module } from '@nestjs/common'
import { IaModule } from '../ia/ia.module'
import { ChatGateway } from './chat.gateway'
import { ChatService } from './chat.service'

@Module({
  imports: [IaModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}

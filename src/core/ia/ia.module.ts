import { Module } from '@nestjs/common'
import { OpenRouterService } from './ia.service'

@Module({
  providers: [OpenRouterService],
  exports: [OpenRouterService],
})
export class IaModule {}

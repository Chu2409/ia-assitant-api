import { Test, TestingModule } from '@nestjs/testing'
import { ChatController } from './chat.controller'
import { OpenRouterService } from '../ia/ia.service'

describe('ChatController', () => {
  let controller: ChatController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [OpenRouterService],
    }).compile()

    controller = module.get<ChatController>(ChatController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})

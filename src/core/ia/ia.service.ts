import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { OpenRouterResponse } from './intefaces/open-router-response'
import { lastValueFrom } from 'rxjs'
import { ContextDto } from './dto/context.dto'

@Injectable()
export class OpenRouterService {
  constructor(private readonly httpService: HttpService) {}

  async chat({
    context,
    model = 'google/learnlm-1.5-pro-experimental:free',
  }: {
    context: ContextDto[]
    model?: string
  }) {
    const preContext: ContextDto[] = [
      {
        role: 'system',
        content:
          'Eres un asistente IA especializado en el área tecnológica. Tu objetivo es ayudar a los usuarios a resolver problemas técnicos y responder preguntas relacionadas con desarrollo de software, programación y tecnología en general. Debes proporcionar respuestas claras y concisas, evitando tecnicismos innecesarios.',
      },
    ]

    const finalContext = [...preContext, ...context]

    const response = await lastValueFrom(
      this.httpService.post<OpenRouterResponse>('', {
        model,
        messages: finalContext,
      }),
    )

    return response.data.choices[0].message.content
  }
}

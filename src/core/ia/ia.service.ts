import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { OpenRouterResponse } from './types/open-router-response'
import { lastValueFrom } from 'rxjs'
import { IContext } from './types/open-router-request'

@Injectable()
export class OpenRouterService {
  constructor(private readonly httpService: HttpService) {}

  private readonly model = 'meta-llama/llama-3.3-8b-instruct:free'

  async chat({ context }: { context: IContext[] }) {
    const preContext: IContext[] = [
      {
        role: 'system',
        content:
          'Eres un asistente IA especializado en el área tecnológica. Tu objetivo es ayudar a los usuarios a resolver problemas técnicos y responder preguntas relacionadas con desarrollo de software, programación y tecnología en general. Debes proporcionar respuestas claras y concisas, evitando tecnicismos innecesarios.',
      },
    ]

    const finalContext = [...preContext, ...context]

    const response = await lastValueFrom(
      this.httpService.post<OpenRouterResponse>('', {
        model: this.model,
        messages: finalContext,
      }),
    )

    return response.data.choices[0].message.content
  }

  async getTitle({ context }: { context: IContext[] }) {
    const preContext: IContext[] = [
      {
        role: 'system',
        content:
          'Eres un asistente IA especializado en el área tecnológica. Tu objetivo va a ser generar un título para una conversación de chat. Debes proporcionar un título claro y conciso, evitando tecnicismos innecesarios y respondiendo solo con el título.',
      },
    ]

    const finalContext = [...preContext, ...context]

    const response = await lastValueFrom(
      this.httpService.post<OpenRouterResponse>('', {
        model: this.model,
        messages: finalContext,
      }),
    )

    return response.data.choices[0].message.content
  }
}

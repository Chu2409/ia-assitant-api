import * as Joi from 'joi'
import { IConfig } from '../types'

export const config = (): { APP: IConfig } => ({
  APP: {
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    DB_URL: process.env.DB_URL!,
    JWT_SECRET: process.env.JWT_SECRET!,
    IA_API_KEY: process.env.IA_API_KEY!,
    IA_API_URL: process.env.IA_API_URL!,
  },
})

export const configValidationSchema = Joi.object<IConfig>({
  PORT: Joi.number().default(3000),
  DB_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  IA_API_KEY: Joi.string().required(),
  IA_API_URL: Joi.string().required(),
})

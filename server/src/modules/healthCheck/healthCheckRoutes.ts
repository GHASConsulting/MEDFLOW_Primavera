import { FastifyInstance } from 'fastify'

export async function healthCheck(app: FastifyInstance) {
  app.get('/', async (): Promise<string> => {
    return 'Health Check'
  })
}

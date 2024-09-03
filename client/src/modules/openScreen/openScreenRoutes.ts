import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { exec as executeCommand } from 'node:child_process'

export async function openScreen(app: FastifyInstance) {
  app.post('/openScreen', async (request, reply): Promise<void> => {
    const bodySchema = z.object({
      urlToOpen: z.string(),
    })

    const { urlToOpen } = bodySchema.parse(request.body)

    try {
      executeCommand(`start "" /MAX "${urlToOpen}"`, (error) => {
        if (error) {
          reply.code(500).send(error)
        }
      })
    } catch (error) {
      console.log(error)
      reply.status(500).send(error)
    }
    reply.code(200).send()
  })
}

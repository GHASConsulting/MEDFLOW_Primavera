import { FastifyInstance, fastify } from 'fastify'
import cors from '@fastify/cors'

import { openScreen } from '../modules/openScreen/openScreenRoutes'

const app: FastifyInstance = fastify()
const apiPort: number = 3434

app.register(cors, {
  origin: true,
})

app.register(openScreen)

app
  .listen({
    port: apiPort,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`HTTP server running on http://localhost:${apiPort}`)
  })

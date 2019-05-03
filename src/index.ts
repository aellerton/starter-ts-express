import app from '@/app'
import logger from '@/logger'
import http from 'http'

const port: string | number = process.env.PORT || 8100
const isProduction: boolean = process.env.NODE_ENV === 'production'

const server = http.createServer(app)

server.listen(port, () => {
  logger.info(`listening in ${process.env.NODE_ENV} mode on ${JSON.stringify(server.address())}`)
})

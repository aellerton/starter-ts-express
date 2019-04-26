import app from '@/app'
import http from 'http'

const port: string | number = process.env.PORT || 8100

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`listening on ${JSON.stringify(server.address())}`)
})

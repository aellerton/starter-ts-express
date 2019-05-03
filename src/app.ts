import {contactEndpoint} from '@/contact'
import express from 'express'
import logger, {expressLogger } from '@/logger'

const app: express.Application = express()
app.use(express.json())
app.use(expressLogger)

app.get('/', (req, res) => {
  const n = (req.query.name || '').trim() || 'world'
  const d = new Date()
  const m = `Hello ${n} at ${d}`
  if (req.accepts('html')) {
    res.send(m)
  } else {
    res.json({name: n, timestamp: d, message: m})
  }
})

app.post('/contact', contactEndpoint)

/**
 * Log a 404 when the path is not processed.
 * This handler must be last.
 */
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.warn(`404 path: ${req.path}`)
  err.status = 404
  next(err)
})

export default app

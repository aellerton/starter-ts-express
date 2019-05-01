import express from 'express'

const app: express.Application = express()

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

export default app

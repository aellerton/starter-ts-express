import express from 'express'
const app: express.Application = express()

app.get('/', (req, res) => {
  res.send(`Hello world at ${new Date()}`)
})

export default app


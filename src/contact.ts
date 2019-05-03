import express from 'express'
import logger from '@/logger'

interface IContactMessage {
  sender: string,
  subject: string,
  message: string,
  timestamp: Date
}

export function contactEndpoint(req: express.Request, res: express.Response) {
  const message: IContactMessage = {
    message: (req.body.message || '').trim(),
    sender: (req.body.sender || '').trim(),
    subject: (req.body.subject || '').trim(),
    timestamp: new Date(),
  }

  const error: any[] = []
  logger.debug('contact received: %j', req.body)
  logger.debug('contact in-flight msg: %j', message)
  if (!message.sender) {
    error.push({field: 'sender', error: 'missing', msg: 'Please enter a value for "sender" field'})
  }
  if (!message.message) {
    error.push({field: 'message', error: 'missing', msg: 'Please enter a value for "message" field'})
  }
  if (error.length) {
    logger.warn('contact API invoked but had errors: %j', error)
  } else {
    logger.info('contact API invoked: %j', message)
  }

  // at this point a real service would do something with the message.
  // ...
  // but not here, because this is just a demo.

  // All done at this point.
  if (req.body.fail400 && error.length) {
    res.status(400)
  }
  res.json({
    error,
    ok: error.length === 0,
    timestamp: message.timestamp,
  })
}

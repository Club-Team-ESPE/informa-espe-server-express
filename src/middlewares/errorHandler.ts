import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  logger.error(err.stack)
  // res.status(500).send({ error: 'Something went wrong!', content: err.stack })
  res.status(500).send({ error_message: err.name })
}

import { Request, Response, NextFunction } from 'express'

export const validationMiddleware = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body)
  if (error != null) {
    return res.status(400).send(error.details)
  }
  // console.log(error)
  return next()
}

import { CustomError } from './CustomError'

export class ValidationError extends CustomError {
  statusCode = 400
  constructor (message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends CustomError {
  statusCode = 404
  constructor (message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends CustomError {
  statusCode = 401
  constructor (message: string) {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export class CustomNameError extends CustomError {
  statusCode = 401
  constructor (message: string, name: string) {
    super(message)
    this.name = name
  }
}

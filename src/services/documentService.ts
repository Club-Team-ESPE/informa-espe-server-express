import { Request } from 'express'

import { documentRepository } from '../repositories/documentRepository'
import { Document } from '@prisma/client'
// import { NewDocument1 } from '../models/document/document'
import { CustomNameError } from '../utils/customError/reqErrorClasses'

export const documentService = {
  async createDocument (data: Request): Promise<Document> {
    try {
      const { name } = data.body
      const url = data.file?.filename ?? ''
      return await documentRepository.create({ name, url })
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomNameError(error.message, 'Error al crear documento')
      } else {
        throw new Error('Error de operación')
      }
    }
  },

  async getAllDocuments () {
    return await documentRepository.getAll()
  },

  async getDocument (id: number) {
    return await documentRepository.findById(id)
  }
}

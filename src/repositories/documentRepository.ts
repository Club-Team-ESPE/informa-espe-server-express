import { prisma } from '../prisma/client'
import { Document } from '@prisma/client'
import { NewDocument2 } from '../models/document/document'

export const documentRepository = {
  async create (document: NewDocument2): Promise<Document> {
    return await prisma.document.create({ data: document })
  },

  async findById (id: number): Promise<Document | null> {
    return await prisma.document.findUnique({
      where: { id }
    })
  },

  async getAll (): Promise<Document[]> {
    return await prisma.document.findMany()
  }
}

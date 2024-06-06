import { prisma } from '../prisma/client'

export const documentRepository = {
  async findById (id: number) {
    return await prisma.document.findUnique({
      where: { id }
    })
  },
  async getAll () {
    return await prisma.document.findMany()
  }
}

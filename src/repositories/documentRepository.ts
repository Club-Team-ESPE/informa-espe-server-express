import { prisma } from '../prisma/client'

export const documentRepository = {
  async findById (id: number) {
    return prisma.document.findUnique({
      where: { id }
    })
  },
  async getAll () {
    return prisma.document.findMany()
  }
}

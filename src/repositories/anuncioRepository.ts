import { prisma } from '../prisma/client'
import { Anuncio } from '@prisma/client'
import { AnuncioDTO } from '../models/anuncio/anuncio'

export const AnuncioRepository = {
  async findById (id: number): Promise<Anuncio | null> {
    return await prisma.anuncio.findUnique({
      where: { id }
    })
  },
  async getAll (): Promise<Anuncio[] | null> {
    return await prisma.anuncio.findMany()
  },
  async create (anuncioData: AnuncioDTO): Promise<Anuncio> { // Tambien Omit<Anuncio, 'id'>
    return await prisma.anuncio.create({ data: anuncioData })
  },
  async update (id: number, data: Partial<Anuncio>): Promise<Anuncio> {
    return await prisma.anuncio.update({
      where: { id },
      data
    })
  },
  async delete (id: number): Promise<Anuncio> {
    return await prisma.anuncio.delete({
      where: { id }
    })
  }
}

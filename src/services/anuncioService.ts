import { AnuncioRepository } from '../repositories/anuncioRepository'
import { Anuncio } from '@prisma/client'
import { AnuncioDTO } from '../models/anuncio/anuncio'

export const AnuncioService = {
  async getAllAnuncios (): Promise<Anuncio[] | null> {
    return await AnuncioRepository.getAll()
  },

  async getAnuncioById (id: number): Promise<Anuncio | null> {
    return await AnuncioRepository.findById(id)
  },

  async createAnuncio (data: AnuncioDTO): Promise<Anuncio> {
    return await AnuncioRepository.create(data)
  },

  async updateAnuncio (id: number, data: Partial<Anuncio>): Promise<Anuncio> {
    return await AnuncioRepository.update(id, data)
  },

  async deleteAnuncio (id: number): Promise<Anuncio> {
    return await AnuncioRepository.delete(id)
  }
}

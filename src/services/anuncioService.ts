import { AnuncioRepository } from '../repositories/anuncioRepository'
import { Anuncio } from '@prisma/client'
import { AnuncioDTO } from '../models/anuncio/anuncio'

import moment from 'moment-timezone'

export const AnuncioService = {
  async getAllAnuncios (): Promise<Anuncio[] | null> {
    return await AnuncioRepository.getAll()
  },

  async getAnuncioById (id: number): Promise<Anuncio | null> {
    return await AnuncioRepository.findById(id)
  },

  async createAnuncio (data: AnuncioDTO): Promise<Anuncio> {
    try {
      let { remitente, titulo, descripcion, fechaEnvio, tag } = data
      const date = new Date()
      const date2 = new Date(fechaEnvio)
      const fechaIngreso = moment(date).tz('America/Guayaquil').format()
      fechaEnvio = moment(date2).tz('America/Guayaquil').format()
      return await AnuncioRepository.create({ remitente, titulo, descripcion, fechaIngreso, fechaEnvio, tag })
    } catch (error) {
      throw new Error('Error al crear el anuncio')
    }
  },

  async updateAnuncio (id: number, data: Partial<Anuncio>): Promise<Anuncio> {
    return await AnuncioRepository.update(id, data)
  },

  async deleteAnuncio (id: number): Promise<Anuncio> {
    return await AnuncioRepository.delete(id)
  }
}

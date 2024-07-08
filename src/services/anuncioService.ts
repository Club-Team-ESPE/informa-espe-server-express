import { Anuncio } from '../models/anuncio/anuncio';
import { AnuncioRepository } from '../repositories/anuncioRepository';

export const AnuncioService = {
  async getAllAnuncios(): Promise<Anuncio[]> {
    return await AnuncioRepository.getAll();
  },

  async getAnuncioById(id: number): Promise<Anuncio | null> {
    return await AnuncioRepository.findById(id);
  },

  async createAnuncio(data: Partial<Anuncio>): Promise<Anuncio> {
    return await AnuncioRepository.create(data);
  },

  async updateAnuncio(id: number, data: Partial<Anuncio>): Promise<Anuncio> {
    return await AnuncioRepository.update(id, data);
  },

  async deleteAnuncio(id: number): Promise<Anuncio> {
    return await AnuncioRepository.delete(id);
  },
};
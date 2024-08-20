// services/noticiaService.ts
import { NoticiaRepository } from '../repositories/noticiaRepository';
import { Noticia } from '@prisma/client';
import { CustomNameError } from '../utils/customError/reqErrorClasses';

export const NoticiaService = {
  async createNoticia(data: { titulo: string; descripcion: string; imagenes: { url: string }[] }): Promise<Noticia> {
    try {
      return await NoticiaRepository.create(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomNameError(error.message, 'Error al crear noticia');
      } else {
        throw new Error('Error de operación');
      }
    }
  },

  
   async  updateNoticia(id: number, data: {
    titulo?: string;
    descripcion?: string;
    fechaPublicacion?: Date;
    imagenes?: { url: string }[];
  }): Promise<Noticia | null> {
    return NoticiaRepository.updateNoticia(id, data);
  },

  async deleteNoticia(id: number): Promise<boolean> {
    try {
      await NoticiaRepository.delete(id);
      return true
    } catch (error) {
      console.error('Error al eliminar noticia:', error);
      return false
    }
  },
  async getAll(): Promise<Noticia[]> {
    return await NoticiaRepository.getAll()
  },

  async getNoticiaById(id: number): Promise<Noticia | null> {
    const noticia = await NoticiaRepository.findById(id);
    if (!noticia) {
      throw new CustomNameError('Noticia no encontrada', 'Error al obtener noticia');
    }
    return noticia
  },
};

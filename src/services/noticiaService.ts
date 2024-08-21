// services/noticiaService.ts
import { NoticiaRepository } from '../repositories/noticiaRepository'
import { Noticia } from '@prisma/client'
import { CustomNameError } from '../utils/customError/reqErrorClasses'

export const NoticiaService = {
  async createNoticia (data: { titulo: string, descripcion: string, imagenes: Array<{ url: string }> }): Promise<Noticia> {
    try {
      return await NoticiaRepository.create(data)
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomNameError(error.message, 'Error al crear noticia')
      } else {
        throw new Error('Error de operación')
      }
    }
  },
  async deleteNoticia (id: number): Promise<boolean> {
    try {
      const deletedNoticia = await NoticiaRepository.delete(id)
      // Si se elimina una noticia, retornamos true
      return deletedNoticia !== null // Retorna true si se eliminó
    } catch (error) {
      // Manejo de errores (opcional)
      console.error(error)
      throw new Error('Error al eliminar la noticia')
    }
  },
  async updateNoticia (id: number, data: {
    titulo?: string
    descripcion?: string
    fechaPublicacion?: Date
    imagenes?: Array<{ url: string }>
  }): Promise<Noticia | null> {
    return await NoticiaRepository.updateNoticia(id, data)
  },
  async getAll (): Promise<Noticia[]> {
    return await NoticiaRepository.getAll()
  },
  async getNoticiaById (id: number): Promise<Noticia | null> {
    const noticia = await NoticiaRepository.findById(id)
    if (noticia == null) {
      throw new CustomNameError('Noticia no encontrada', 'Error al obtener noticia')
    }
    return noticia
  }
}

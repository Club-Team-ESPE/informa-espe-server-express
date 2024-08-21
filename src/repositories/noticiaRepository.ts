// repositories/noticiaRepository.ts
import { prisma } from '../prisma/client'
import { Noticia } from '@prisma/client'

export const NoticiaRepository = {
  async create (data: { titulo: string, descripcion: string, imagenes: Array<{ url: string }> }): Promise<Noticia> {
    return await prisma.noticia.create({
      data: {
        titulo: data.titulo,
        descripcion: data.descripcion,
        imagenes: {
          create: data.imagenes // Suponiendo que tienes la relación configurada en Prisma
        }
      }
    })
  },
  async  updateNoticia(id: number, data: {
    titulo?: string;
    descripcion?: string;
    fechaPublicacion?: Date;
    imagenes?: { url: string }[];
  }): Promise<Noticia> {
    try {
      return await prisma.$transaction(async (prisma) => {
        // Primero, eliminamos las imágenes antiguas
        await prisma.imagen.deleteMany({
          where: { noticiaId: id },
        });
  
        // Luego, actualizamos la noticia con las nuevas imágenes
        return await prisma.noticia.update({
          where: { id },
          data: {
            titulo: data.titulo,
            descripcion: data.descripcion,
            fechaPublicacion: data.fechaPublicacion,
            imagenes: {
              create: data.imagenes,
            },
          },
          include: {
            imagenes: true,
          },
        })
      })
    } catch (error) {
      console.error('Error updating noticia:', error);
      throw error; // Lanza el error para que el controlador pueda manejarlo
    }
  },
  async delete(id: number): Promise<void> {
    try {
      // Usamos una transacción para eliminar imágenes y la noticia
      await prisma.$transaction(async (prisma) => {
        await prisma.imagen.deleteMany({
          where: { noticiaId: id }
        });
        await prisma.noticia.delete({
          where: { id }
        });
      });
    } catch (error) {
      console.error('Error deleting noticia:', error);
      throw new Error('Error deleting noticia');
    }
  async getAll (): Promise<Noticia[]> {
    return await prisma.noticia.findMany({
      include: {
        imagenes: true
      }
    })
  },
  async findById (id: number): Promise<Noticia | null> {
    return await prisma.noticia.findUnique({
      where: { id },
      include: {
        imagenes: true,
      },
    });
  },
};

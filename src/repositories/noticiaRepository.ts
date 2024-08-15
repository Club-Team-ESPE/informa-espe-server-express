// repositories/noticiaRepository.ts
import { prisma } from '../prisma/client';
import { Noticia } from '@prisma/client';

export const NoticiaRepository = {
  async create(data: { titulo: string; descripcion: string; imagenes: { url: string }[] }): Promise<Noticia> {
    return await prisma.noticia.create({
      data: {
        titulo: data.titulo,
        descripcion: data.descripcion,
        imagenes: {
          create: data.imagenes // Suponiendo que tienes la relación configurada en Prisma
        }
      }
    });
  },

  async delete(id: number): Promise<void> {
    await prisma.noticia.delete({ where: { id } });
  },

  async getAll(): Promise<Noticia[]> {
    return await prisma.noticia.findMany({
      include: {
        imagenes: true,
      },
    });
  },

  async findById(id: number): Promise<Noticia | null> {
    return await prisma.noticia.findUnique({
      where: { id },
    });
  },
};

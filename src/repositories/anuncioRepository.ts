import { PrismaClient } from '@prisma/client';
import { Anuncio } from '../models/anuncio/anuncio';

const prisma = new PrismaClient();

export const AnuncioRepository = {
  async findById(id: number): Promise<Anuncio | null> {
    return await prisma.anuncio.findUnique({
      where: { id },
    });
  },

  async getAll(): Promise<Anuncio[]> {
    return await prisma.anuncio.findMany();
  },

  async create(data: Partial<Anuncio>): Promise<Anuncio> {
    return await prisma.anuncio.create({ data });
  },

  async update(id: number, data: Partial<Anuncio>): Promise<Anuncio> {
    return await prisma.anuncio.update({
      where: { id },
      data,
    });
  },

  async delete(id: number): Promise<Anuncio> {
    return await prisma.anuncio.delete({
      where: { id },
    });
  },
};
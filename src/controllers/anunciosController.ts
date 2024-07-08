import { Request, Response } from 'express';
import { Anuncio } from '../models/anuncio/anuncio';
import { AnuncioService } from '../services/anuncioService';

export const AnuncioController = {
  async createAnuncio(req: Request, res: Response): Promise<void> {
    const { remitente, titulo, descripcion, horaEnvio, tag } = req.body as Anuncio;
    try {
      const newAnuncio = await AnuncioService.createAnuncio({ remitente, titulo, descripcion, horaEnvio, tag });
      res.json(newAnuncio);
    } catch (error) {
      res.status(500).json({ error: 'Error creating anuncio' });
    }
  },

  async getAllAnuncios(req: Request, res: Response): Promise<void> {
    try {
      const allAnuncios = await AnuncioService.getAllAnuncios();
      res.json(allAnuncios);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving anuncios' });
    }
  },

  async getAnuncioById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const anuncio = await AnuncioService.getAnuncioById(parseInt(id));
      if (!anuncio) {
        res.status(404).json({ error: 'Anuncio not found' });
      } else {
        res.json(anuncio);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving anuncio' });
    }
  },

  async updateAnuncio(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { remitente, titulo, descripcion, fechaPublicacion, horaEnvio, tag } = req.body as Anuncio;
    try {
      const updatedAnuncio = await AnuncioService.updateAnuncio(parseInt(id), { remitente, titulo, descripcion, fechaPublicacion, horaEnvio, tag });
      res.json(updatedAnuncio);
    } catch (error) {
      res.status(500).json({ error: 'Error updating anuncio' });
    }
  },

  async deleteAnuncio(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await AnuncioService.deleteAnuncio(parseInt(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting anuncio' });
    }
  },
};
import { NextFunction, Request, Response } from 'express'
import { AnuncioDTO, AnuncioUpdateDTO } from '../models/anuncio/anuncio'
import { AnuncioService } from '../services/anuncioService'

export const AnuncioController = {
  createAnuncio (req: Request, res: Response, next: NextFunction): void {
    const anuncio = req.body as AnuncioDTO
    AnuncioService.createAnuncio(anuncio)
      .then(newAnuncio => res.json(newAnuncio))
      .catch(error => next(error))
  },

  getAllAnuncios (_req: Request, res: Response, next: NextFunction): void {
    AnuncioService.getAllAnuncios()
      .then(allAnuncios => res.json(allAnuncios))
      .catch(error => next(error))
  },

  getAnuncioById (req: Request, res: Response, next: NextFunction): void {
    const { id } = req.params
    AnuncioService.getAnuncioById(parseInt(id))
      .then(anuncio => {
        if (anuncio == null) {
          res.status(400).json({ error: 'Anuncio not found' })
        } else {
          res.json(anuncio)
        }
      })
      .catch(error => next(error))
  },

  updateAnuncio (req: Request, res: Response, next: NextFunction): void {
    const { id } = req.params
    const { remitente, titulo, descripcion, fechaEnvio, tag } = req.body as AnuncioUpdateDTO
    AnuncioService.updateAnuncio(parseInt(id), { remitente, titulo, descripcion, fechaEnvio, tag })
      .then(updatedAnuncio => res.json(updatedAnuncio))
      .catch(error => next(error))
  },

  deleteAnuncio (req: Request, res: Response, next: NextFunction): void {
    const { id } = req.params
    AnuncioService.deleteAnuncio(parseInt(id))
      .then(anuncio => res.status(204).send(anuncio))
      .catch(error => next(error))
  }
}

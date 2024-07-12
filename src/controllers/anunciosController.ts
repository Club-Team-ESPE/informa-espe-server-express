import { NextFunction, Request, Response } from 'express'
import { AnuncioDTO, AnuncioUpdateDTO } from '../models/anuncio/anuncio'
import { AnuncioService } from '../services/anuncioService'
import moment from 'moment-timezone'

export const AnuncioController = {
  createAnuncio (req: Request, res: Response, next: NextFunction): void {
    const { remitente, titulo, descripcion, fechaEnvio, tag } = req.body as AnuncioDTO
    const date = new Date()
    const fechaIngreso = moment(date).tz('America/Guayaquil').format()
    AnuncioService.createAnuncio({ remitente, titulo, descripcion, fechaIngreso, fechaEnvio, tag })
      .then(anuncio => res.json(anuncio))
      .catch(error => {
        next(error)
      })
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
          res.status(404).json({ error: 'Anuncio not found' })
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

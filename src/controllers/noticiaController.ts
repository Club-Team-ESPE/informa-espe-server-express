import { RequestWithFiles } from '../models/noticia/noticia'
import { NoticiaService } from '../services/noticiaService'
import { Response, NextFunction, Request } from 'express'

export const NoticiaController = {
  createNoticia (req: RequestWithFiles, res: Response, next: NextFunction): void {
    const { titulo, descripcion } = req.body
    let imagenes: Array<{ url: string }> = []

    if (req.files != null && typeof req.files === 'object' && 'imagenes' in req.files) {
      imagenes = req.files.imagenes.map((file: Express.Multer.File) => ({ url: file.filename }))
    }

    NoticiaService.createNoticia({ titulo, descripcion, imagenes })
      .then(noticia => {
        res.status(201).json(noticia)
      })
      .catch(error => {
        next(error)
      })
  },

  getAllNoticias (_req: Request, res: Response, next: NextFunction): void {
    NoticiaService.getAll()
      .then(noticias => {
        res.status(200).json(noticias)
      })
      .catch(error => {
        next(error)
      })
  },

  getNoticiaById (req: Request, res: Response, next: NextFunction): void {
    const { id } = req.params

    NoticiaService.getNoticiaById(Number(id))
      .then(noticia => {
        res.status(200).json(noticia)
      })
      .catch(error => {
        next(error)
      })
  },

  deleteNoticia (req: Request, res: Response, next: NextFunction): void {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      res.status(400).json({ message: 'ID de noticia inválido' })
      return
    }

    NoticiaService.deleteNoticia(id)
      .then(deleted => {
        if (!deleted) {
          res.status(404).json({ message: 'Noticia no encontrada' })
          return
        }
        res.status(204).send()
      })
      .catch(error => {
        next(error)
      })
  }
}

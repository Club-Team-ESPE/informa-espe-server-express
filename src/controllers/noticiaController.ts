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
  async  updateNoticia(req: RequestWithFiles, res: Response): Promise<Response> {
    try {
      const { id } = req.params; 
      const { titulo, descripcion, fechaPublicacion } = req.body;
      let imagenes: { url: string }[] = [];
  
      if (req.files && typeof req.files === 'object' && 'imagenes' in req.files) {
        imagenes = req.files.imagenes.map((file: Express.Multer.File) => ({ url: file.filename }));
      }
  
      const updatedNoticia = await NoticiaService.updateNoticia(Number(id), { 
        titulo, 
        descripcion, 
        fechaPublicacion,
        imagenes
      });
  
      if (!updatedNoticia) {
        return res.status(404).json({ message: 'Noticia not found' });
      }
  
      return res.status(200).json(updatedNoticia);
    } catch (error) {
      console.error('Error in updateNoticia controller:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
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
deleteNoticia (req: Request, res: Response): void {
  const id = parseInt(req.params.id, 10)

  if (isNaN(id)) {
    res.status(400).json({ message: 'Id no valido' })
    return
  }

  NoticiaService.deleteNoticia(id)
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'Noticia not found or could not be deleted' })
        return
      }
      res.status(200).json({ message: 'Noticia se elimino correctamente' })
    })
    .catch(error => {
      console.error('Error in deleteNoticia controller:', error)
      res.status(500).json({ message: 'Internal server error' })
    })
}

}

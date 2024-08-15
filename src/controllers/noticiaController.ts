import { RequestWithFiles } from '../models/noticia/noticia';
import { NoticiaService } from '../services/noticiaService';
import { Response, NextFunction, Request } from 'express';

export const    NoticiaController = {
  async createNoticia(req: RequestWithFiles, res: Response, next: NextFunction): Promise<void> {
    try {
      const { titulo, descripcion } = req.body;
      let imagenes: { url: string }[] = [];

      // Verifica si req.files es un objeto y tiene la propiedad 'imagenes'
      if (req.files && typeof req.files === 'object' && 'imagenes' in req.files) {
        // Mapea los archivos a la forma esperada
        imagenes = req.files.imagenes.map((file: Express.Multer.File) => ({ url: file.filename }));
      }

      const noticia = await NoticiaService.createNoticia({ titulo, descripcion, imagenes });
      res.status(201).json(noticia);
    } catch (error) {
      next(error);
    }
  },

  async getAllNoticias(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const noticias = await NoticiaService.getAll();
      res.status(200).json(noticias);
    } catch (error) {
      next(error);
    }
  },
  

  async getNoticiaById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params; // Obtiene el ID de los parámetros
      const noticia = await NoticiaService.getNoticiaById(Number(id)); // Llama al servicio para obtener la noticia

      res.status(200).json(noticia);
    } catch (error) {
      next(error);
    }
  },
  
  async deleteNoticia(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
  
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID de noticia inválido' });
        return;
      }
  
      const deleted = await NoticiaService.deleteNoticia(id);
  
      // Verificamos si se eliminó la noticia
      if (!deleted) {
        res.status(404).json({ message: 'Noticia no encontrada' });
        return;
      }
  
      res.status(204).send(); // Responde con 204 No Content
    } catch (error) {
      next(error);
    }
  }
};

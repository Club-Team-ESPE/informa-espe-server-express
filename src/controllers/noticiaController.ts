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
      const { id } = req.params; 
      const noticia = await NoticiaService.getNoticiaById(Number(id));

      res.status(200).json(noticia);
    } catch (error) {
      next(error);
    }
  },
  async deleteNoticia(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({ message: 'Id no valido' });
      }

      const result = await NoticiaService.deleteNoticia(id);

      if (!result) {
        return res.status(404).json({ message: 'Noticia not found or could not be deleted' });
      }

      return res.status(200).json({ message: 'Noticia se elimino correctamente' });
    } catch (error) {
      console.error('Error in deleteNoticia controller:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

};

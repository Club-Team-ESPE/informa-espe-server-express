// routes/noticiaRoutes.ts
import express, { Router } from 'express';
import { getMulterUpload } from '../../config/multerConfig';
import { NoticiaController } from '../../controllers/noticiaController';
import { noticiaSchema } from '../../models/noticia/noticiaSchema';
import { validationMiddleware } from '../../middlewares/validations';

const router: Router = express.Router();

// Configura Multer para manejar múltiples imágenes
router.post(
  '/',
  getMulterUpload('../../docs/uploads/noticias').fields([{ name: 'imagenes', maxCount: 10 }]),
  validationMiddleware(noticiaSchema),
  NoticiaController.createNoticia
);
router.delete('/:id', NoticiaController.deleteNoticia);

// GET /noticias - Obtener todas las noticias
router.get('/', NoticiaController.getAllNoticias);

// GET /noticias/:id - Obtener una noticia por ID
router.get('/:id', NoticiaController.getNoticiaById);

export default router;

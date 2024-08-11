import express, { Router } from 'express'
import { getMulterUpload } from '../../config/multerConfig'

import { documentController } from '../../controllers/documentsController'

import { validationMiddleware } from '../../middlewares/validations'
import { documentSchema } from '../../models/document/documentSchemas'

const router: Router = express.Router()

// POST /anuncios - Crear un nuevo anuncio
router.post('/',
  getMulterUpload('../../docs/uploads/documents').single('file'),
  validationMiddleware(documentSchema),
  documentController.createDocument
)

router.get('/:id', documentController.getDocument)
router.get('/', documentController.getAllDocuments)

export default router

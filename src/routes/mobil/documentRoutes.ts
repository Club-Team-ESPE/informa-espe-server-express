import { Router } from 'express'
// Controllers
import { documentController } from '../../controllers/documentsController'
// Schemas
// import { documentSchema } from '../../models/document/documentSchemas'
// Middlewares
// import { validationMiddleware } from '../../middlewares/validations'

const router = Router()

router.get('/:id', documentController.getDocument)
router.get('/', documentController.getAllDocuments)

export default router

import { Router } from 'express'
import documentsRoutes from './documentRoutes'
import anunciosRoutes from './anuncioRoutes'

const router = Router()

router.use('/documents', documentsRoutes)
router.use('/announcements', anunciosRoutes)

export default router

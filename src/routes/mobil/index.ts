import { Router } from 'express'
import documentsRoutes from './documentRoutes'
import anunciosRoutes from './anuncioRoutes'
import noticiaRoutes from './noticiaRoutes'

const router = Router()

router.use('/documents', documentsRoutes)
router.use('/announcements', anunciosRoutes)
router.use('/news', noticiaRoutes)

export default router

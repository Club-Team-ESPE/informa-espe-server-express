import { Router } from 'express'
import documentsRoutes from './documentRoutes'

const router = Router()

router.use('/documents', documentsRoutes)

export default router

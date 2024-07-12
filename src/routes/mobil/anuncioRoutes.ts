import express, { Router } from 'express'
import { AnuncioController } from '../../controllers/anunciosController'

import { validationMiddleware } from '../../middlewares/validations'
import { AnuncioSchema } from '../../models/anuncio/anuncioSchema'

const router: Router = express.Router()

// POST /anuncios - Crear un nuevo anuncio
router.post('/', validationMiddleware(AnuncioSchema), AnuncioController.createAnuncio)

// GET /anuncios - Obtener todos los anuncios
router.get('/', AnuncioController.getAllAnuncios)

// GET /anuncios/:id - Obtener un anuncio por ID
router.get('/:id', AnuncioController.getAnuncioById)

// PUT /anuncios/:id - Actualizar un anuncio por ID
router.put('/:id', validationMiddleware(AnuncioSchema), AnuncioController.updateAnuncio)

// DELETE /anuncios/:id - Eliminar un anuncio por ID
router.delete('/:id', AnuncioController.deleteAnuncio)

export default router

import Joi from 'joi'

export const noticiaSchema = Joi.object({
  titulo: Joi.string().required(),
  descripcion: Joi.string().required(),
  fechaPublicacion: Joi.date().optional(),
  imagenes: Joi.array().items(
    Joi.object({
      url: Joi.string().optional()
    })
  ).optional()
})
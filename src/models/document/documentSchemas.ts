import Joi from 'joi'

export const documentSchema = Joi.object({
  name: Joi.string().required(),
  file: Joi.string()
})

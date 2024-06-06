import Joi from 'joi'

export const documentSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  url: Joi.string().required()
})

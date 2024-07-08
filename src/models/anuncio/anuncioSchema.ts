import Joi from 'joi';

export const AnuncioSchema = Joi.object({
  remitente: Joi.string().required(),
  titulo: Joi.string().required(),
  descripcion: Joi.string().required(),
  horaEnvio: Joi.date().required(),
  tag: Joi.string().valid('ITIN', 'BIO', 'AGRO', 'General').required(),
});
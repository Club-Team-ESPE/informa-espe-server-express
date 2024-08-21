import { Imagen } from '../imagen/imagen'
import { Request } from 'express'

export interface Noticia {
  id: number
  titulo: string
  descripcion: string
  fechaPublicacion: Date
  imagenes: Imagen[]
}

export interface createNoticiaDTO {
  titulo: string
  descripcion: string
  fechaPublicacion?: Date
  imagenes: Array<{ url: string }>
}

export interface RequestWithFiles extends Request {
  files?: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[] // Definición para `files`
}

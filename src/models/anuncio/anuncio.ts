export enum Tag {
  ITIN = 'ITIN',
  BIO = 'BIO',
  AGRO = 'AGRO',
  General = 'General',
}

export interface AnuncioDTO {
  remitente: string
  titulo: string
  descripcion: string
  fechaIngreso: string
  fechaEnvio: string
  tag: Tag
}

export interface AnuncioUpdateDTO {
  remitente: string
  titulo: string
  descripcion: string
  fechaEnvio: string
  tag: Tag
}

import { Imagen } from '../imagen/imagen';

export interface Noticia {
  id: number;
  titulo: string;
  descripcion: string;
  fechaPublicacion: Date;
  imagenes: Imagen[];
}
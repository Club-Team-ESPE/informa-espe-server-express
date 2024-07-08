export interface Anuncio {
    id: number;
    remitente: string;
    titulo: string;
    descripcion: string;
    fechaPublicacion: Date;
    horaEnvio: Date;
    tag: Tag;
  }
  
  export enum Tag {
    ITIN = 'ITIN',
    BIO = 'BIO',
    AGRO = 'AGRO',
    General = 'General',
  }
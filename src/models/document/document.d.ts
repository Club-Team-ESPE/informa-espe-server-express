export interface Document {
  id: number
  name: string
  url: string
}

export type NewDocument = Omit<Document, 'id'>

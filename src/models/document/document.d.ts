export interface Document {
  id: number
  name: string
  url: string
}

export type NewDocument1 = Omit<Document, 'id', 'url'>
export type NewDocument2 = Omit<Document, 'id'>

import { Request, Response, NextFunction } from 'express'
import { documentService } from '../services/documentService'
// import { NewDocument1 } from '../models/document/document'

export const documentController = {
  createDocument (req: Request, res: Response, next: NextFunction): void {
    // const document = req.body as NewDocument1
    documentService.createDocument(req)
      .then(anuncio => res.json(anuncio))
      .catch(error => { next(error) })
  },

  getAllDocuments (_req: Request, res: Response): void {
    documentService.getAllDocuments().then(documents => {
      if (documents.length === 0) {
        return res.status(400).send({ message: 'No se encontraron documentos' })
      }
      return res.status(200).send(documents)
    }).catch(error => {
      throw error
    })
  },
  getDocument (req: Request, res: Response): void {
    documentService.getDocument(+req.params.id)
      .then(document => {
        if (document == null) {
          return res.status(400).send({ message: 'Documento no encontrado' })
        }
        return res.status(200).send(document)
      })
      .catch(error => {
        throw error
      })
  }
}

import { Request, Response } from 'express'
import { documentService } from '../services/documentService'

export const documentController = {
  getAllDocuments (_req: Request, res: Response): void {
    documentService.getAllDocuments().then(documents => {
      if (documents.length === 0) {
        return res.status(404).send({ message: 'There are no saved documents' })
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
          return res.status(404).send({ message: 'Document not found' })
        }
        return res.status(200).send(document)
      })
      .catch(error => {
        throw error
      })
  }
}

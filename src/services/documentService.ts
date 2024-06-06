import { documentRepository } from '../repositories/documentRepository'

export const documentService = {
  async getAllDocuments () {
    return await documentRepository.getAll()
  },
  async getDocument (id: number) {
    return await documentRepository.findById(id)
  }
}

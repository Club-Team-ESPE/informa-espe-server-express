import multer, { StorageEngine } from 'multer'
import path from 'path'

export function getMulterUpload (dir: string): multer.Multer {
  const storage: StorageEngine = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, path.join(__dirname, dir))
    },
    filename: (_req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })

  return multer({ storage })
}

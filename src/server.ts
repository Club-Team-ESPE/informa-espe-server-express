import { app } from './app'
import { ENV } from './config/environment'
// import https from 'https'
// import fs from 'fs'
import { prisma } from './prisma/client'

const startServer = async (): Promise<void> => {
  try {
    // Conectar a la base de datos
    await prisma.$connect()
    console.log('Connected to the database')
    /*
    // Opciones de HTTPS
    const httpsOptions = {
      key: fs.readFileSync('../server.key'),
      cert: fs.readFileSync('../server.crt')
    }
        // Iniciar el servidor HTTPS
        https.createServer(httpsOptions, app).listen(ENV.PORT, () => {
          console.log(`HTTPS Server is running on port ${ENV.PORT}`)
        })
    */

    // Iniciar el servidor
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`)
    })
  } catch (error) {
    console.error('Error starting server:', error)
    process.exit(1)
  }
}

void (async () => {
  await startServer()
})()

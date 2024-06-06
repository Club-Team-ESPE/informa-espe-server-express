import { app } from './app'
import { ENV } from './config/environment'

import { prisma } from './prisma/client'

const startServer = async (): Promise<void> => {
  try {
    // Conectar a la base de datos
    await prisma.$connect()
    console.log('Connected to the database')

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

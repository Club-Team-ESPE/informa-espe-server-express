import express from 'express' // ESModules
// Middlewares
import { errorHandler } from './middlewares/errorHandler'
// Routes
import mobileApiRoutes from './routes/mobil/index'

import moment from 'moment-timezone'

const app = express()

process.env.TZ = 'America/Guayaquil'

const date = new Date()
const localDate = moment(date).tz('America/Guayaquil').format()

console.log('Fecha en zona horaria local:', localDate)

// Middlewares
app.use(express.json())

// Routes
app.use('/api/mobil', mobileApiRoutes)
/*
app.all('*', (_req, res) => {
  res.status(404)
  res.json({ error: '404 Not Found' })
}) */
app.use(errorHandler)

export { app }

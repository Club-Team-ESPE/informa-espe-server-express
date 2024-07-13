import express from 'express' // ESModules
// Middlewares
import cors from 'cors'
import corsOptions from './config/corsOptions'
import { errorHandler } from './middlewares/errorHandler'
// Tools
import moment from 'moment-timezone'
// Routes
import mobileApiRoutes from './routes/mobil/index'

const app = express()

// Middlewares
app.use(express.json())
app.use(cors(corsOptions))

// Routes
app.use('/api/mobil', mobileApiRoutes)

app.all('*', (_req, res) => {
  res.status(404)
  res.json({ error: '404 Not Found' })
})

app.use(errorHandler)

process.env.TZ = 'America/Guayaquil'
const date = new Date()
const localDate = moment(date).tz('America/Guayaquil').format()
console.log('Fecha en zona horaria local:', localDate)

export { app }

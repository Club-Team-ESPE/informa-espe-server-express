import express from 'express' // ESModules
// Middlewares
import { errorHandler } from './middlewares/errorHandler'
// Routes
import mobileApiRoutes from './routes/mobil/index'

const app = express()

// Middlewares
app.use(express.json())

// Routes
app.use('/api/mobile', mobileApiRoutes)
/*
app.all('*', (_req, res) => {
  res.status(404)
  res.json({ error: '404 Not Found' })
}) */

app.use(errorHandler)

export { app }

const allowedOrigins = [
  'http://localhost:8100',
  'https://localhost',
  'http://192.168.0.0',
  '*'
]

const corsOptions = {
  origin: allowedOrigins
}

export default corsOptions

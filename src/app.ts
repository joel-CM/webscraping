import express from 'express'
import cors from 'cors'
import api from './services/api'

const app = express()

// settings
const PORT = process.env.PORT ?? 3001
app.set('port', PORT)
const allowedOrigins = '*'
const options: cors.CorsOptions = {
  origin: allowedOrigins
}

// middlewares
app.use(express.json())
app.use(cors(options))

// route
app.get('/api', api)

export default app

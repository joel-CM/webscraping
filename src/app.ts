import express from 'express'
import api from './services/api'

const app = express()

// settings
const PORT: number = 3001 ?? process.env?.PORT
app.set('port', PORT)

// middlewares
app.use(express.json())

// route
app.get('/api', api)

export default app

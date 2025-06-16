import express from 'express'
import cors from 'cors'
import boardsRouter from './app/routes/board.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', boardsRouter)

export default app
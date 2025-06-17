import express from 'express'
import cors from 'cors'
import boardsRouter from './app/routes/board.js'
import cardsRouter from './app/routes/cards.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', boardsRouter)
app.use('/api', cardsRouter)

export default app
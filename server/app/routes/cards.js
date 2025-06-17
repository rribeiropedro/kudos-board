import express from 'express'
import { PrismaClient } from '@prisma/client'
import ValidationError from '../middleware/ValidationError.js'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/cards/:boardId', async (req, res) => {
  const boardId = Number(req.params.boardId);
  if (!boardId || isNaN(boardId)) {
    return res.status(400).json({ error: 'Invalid board ID' })
  }
  try {
    const cards = await prisma.board.findUnique({
      where: { id: boardId },
      include: {
        cards: true
      }
    })
    res.json(cards.cards)
  } catch (error) {
    res.status(404).json({ error: 'Board not found' })
  }
})

router.post('/cards', async (req, res) => {
  const { title, message, gifUrl } = req.body
  let boardId = Number(req.body.boardId)
  if (!title || typeof title !== 'string') {
    throw new ValidationError("Title is missing")
  } else if (!message || typeof message !== 'string') {
    throw new ValidationError("Message is missing")
  } else if (!boardId || isNaN(boardId)) {
    throw new ValidationError("Board Id is missing")
  }
  try {
    console.log('here')
    await prisma.card.create({
      data: {
        title: title,
        message: message,
        gifUrl: gifUrl || null,
        upvotes: 0,
        boardId: boardId
      }
    })
    res.status(200).json({ message: "all good"})
  } catch (error) {
    res.status(404).json({ error: 'Board not found'})
  }
})

router.delete('/cards/:cardId', async (req, res) => {
  const cardId = Number(req.params.cardId)
  if (!cardId || isNaN(cardId)) {
    return res.status(400).json({ error: 'Invalid card ID' })
  }
  try {
    const deleteCard = await prisma.card.delete({
      where: { id: Number(cardId) },
    })
    res.json(deleteCard)
  } catch (error) {
    res.status(404).json({ error: 'Card not found' })
  }
})

router.put('/cards/:cardId/upvote', async (req, res) => {
    const cardId = Number(req.params.cardId)
    if (!cardId || isNaN(cardId)) {
      return res.status(400).json({ error: 'Invalid card ID' })
    }
    try {
      const updatedCard = await prisma.card.update({
        where: { id: Number(cardId) },
        data: {
          upvotes: {
            increment: 1
          },
        },
      })
      res.json(updatedCard)
    } catch (error) {
      res.status(404).json({ error: 'Card not found' })
    }
})

export default router
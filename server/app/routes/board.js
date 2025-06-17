import express from 'express'
import { PrismaClient } from '@prisma/client'
import ValidationError from '../middleware/ValidationError.js'

const router = express.Router()
const prisma = new PrismaClient()
const allowedCategories = ["CELEBRATION", "THANK_YOU", "INSPIRATION"]

function formatEnum(enumValue) {
  return enumValue
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

router.get('/boards', async (req, res) => {
  const { title, category } = req.query
  const filters = {}
  title && (filters.title = {
      contains: title,
      mode: "insensitive"
    })
  if (category && allowedCategories.includes(category.toUpperCase())) {
    filters.category = category.toUpperCase()
  }
  try {
    const boards = await prisma.board.findMany({
      where: filters,
    })
    const formattedBoards = boards.map(board => ({
      ...board,
      category: formatEnum(board.category),
    }));
    res.status(200).json(formattedBoards)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server Error' })
  }
})

router.post('/boards', async (req, res) => {
  const { author, category, title, imgUrl } = req.body
  if (!author || typeof author !== 'string') {
    throw new ValidationError("Author is missing")
  } else if (!category || !allowedCategories.includes(category)) {
    throw new ValidationError("Category is missing")
  } else if (!title || typeof title !== 'string') {
    throw new ValidationError("Category is missing")
  }
  const newBoard = await prisma.board.create({
    data: {
      author,
      category,
      title,
      imgUrl: imgUrl || null
    }
  })
  const formattedNewBoard = {
    ...newBoard,
    category: formatEnum(newBoard.category)
  }
  res.status(200).json(formattedNewBoard)
})

router.delete('/boards/:boardId', async (req, res) => {
  const boardId = Number(req.params.boardId)
  if (!boardId || isNaN(boardId)) {
    return res.status(400).json({ error: 'Invalid board ID' })
  }
  try {
    await prisma.card.deleteMany({
      where: { boardId: boardId },
    })
    console.log('here')
    await prisma.board.delete({
      where: { id: boardId },
    })
    res.status(200).json("Success")
  } catch (error) {
    res.status(404).json({ error: 'Board not found' })
  }
})

export default router
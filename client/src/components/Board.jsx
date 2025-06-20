import React from "react"
import { Navigate, useNavigate } from "react-router-dom"
import '../styles/card.css'
import useKudos from "../hooks/useKudos"

const Board = ({ id, title, category, img }) => {

  const { components, setComponents, setIsCard, setCurrBoard, setCurrBoardId } = useKudos()
  const navigate = useNavigate()
  const url = import.meta.env.VITE_APP_SERVER_URL

  const handleViewBoard = async () => {
    const response = await fetch(url + `cards/${id}`)
    const data = await response.json()
    const newList = [...data].sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return a.pinned ? -1 : 1;
      }
      if (a.pinned && b.pinned) {
        return new Date(b.pinnedTime) - new Date(a.pinnedTime);
      } else {
        return a.id - b.id;
      }
    })
    setIsCard(true)
    setCurrBoard(title)
    setCurrBoardId(id)
    setComponents(newList)
    navigate(`/boards/${id}`) 
  }

  const handleDeleteBoard = () => {
    console.log(id)
    fetch(url + `boards/${id}`, {method: 'DELETE'})
      .then(response => {
        setComponents(components.filter(item => item.id !== id))
      })
  }

  return (
    <div className="card-container">
      <div className="card-info">
        <img className="board-img" />
        <h1>{title}</h1>
        <h3>{category}</h3>
        <div className="board-btn-container">
          <button onClick={handleViewBoard}>View Board</button>
          <button onClick={handleDeleteBoard} id="board-delete-btn">Delete Board</button>
        </div>
      </div>
    </div>
  )
}

export default Board
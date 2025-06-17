import React from "react"
import '../styles/card.css'
import useKudos from "../hooks/useKudos"

const Board = ({ id, title, category, img }) => {

  const { components, setComponents, isCard, setIsCard, currBoard, setCurrBoard } = useKudos()

  const handleViewBoard = () => {
    console.log('here')
    fetch(`http://localhost:3000/api/cards/${id}`)
      .then(response => response.json())
      .then(data => {
        setComponents(data)
        setIsCard(true)
        setCurrBoard(title)
      })
      .catch(error => console.log(error))
  }
  
  return (
    <div className="card-container">
      <div className="card-info">
        <img className="board-img" />
        <h1>{title}</h1>
        <h3>{category}</h3>
        <div className="board-btn-container">
          <button onClick={handleViewBoard}>View Board</button>
          <button id="board-delete-btn">Delete Board</button>
        </div>
      </div>
    </div>
  )
}

export default Board
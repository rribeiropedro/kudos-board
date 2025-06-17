import React from "react"
import '../styles/card.css'
import useKudos from "../hooks/useKudos"

const Card = ({ id, title, message, img, upvotes, boardId }) => {

  const { components, setComponents } = useKudos()

  const handleDeleteCard = () => {
    console.log(id)
    fetch(`http://localhost:3000/api/cards/${id}`, {method: 'DELETE'})
      .then(response => {
        setComponents(components.filter(item => item.id !== id))
      })
  }

  return (
    <div className="card-container">
      <div className="card-info">
        <h1>{title}</h1>
        <h3>{message}</h3>
        <img className="card-img"/>
      </div>
      <div className="card-btn-container">
        <button>Update: {upvotes}</button>
        <button onClick={handleDeleteCard} id="card-delete-btn">Delete Board</button>
      </div>
    </div>
  )
}

export default Card
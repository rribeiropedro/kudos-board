import React from "react"
import '../styles/card.css'
import useKudos from "../hooks/useKudos"

const Card = ({ id, title, message, video, upvotes, boardId }) => {

  const { components, setComponents } = useKudos()

  const handleDeleteCard = () => {
    fetch(`http://localhost:3000/api/cards/${id}`, {method: 'DELETE'})
      .then(response => {
        setComponents(components.filter(item => item.id !== id))
      })
  }

  const handleUpvote = () => {
    fetch(`http://localhost:3000/api/cards/${id}/upvote`, {method: 'PUT'})
      .then(respone => respone.json())
      .then(data => {
        const index = components.findIndex(item => item.id === id)
        setComponents(prev => {
          const updatedList = [...prev]
          updatedList[index] = data
          return updatedList
        })
      })
  }

  return (
    <div className="card-container">
      <div className="card-info">
        <h1>{title}</h1>
        <h3>{message}</h3>
        <video 
          src={video}
          className="card-img"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className="card-btn-container">
        <button onClick={handleUpvote}>Update: {upvotes}</button>
        <button onClick={handleDeleteCard} id="card-delete-btn">Delete Board</button>
      </div>
    </div>
  )
}

export default Card
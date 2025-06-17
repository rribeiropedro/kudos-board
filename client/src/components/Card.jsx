import React from "react"
import '../styles/card.css'

const Card = ({ id, title, message, img, upvotes, boardId, boardTitle }) => {
  return (
    <div className="card-container">
      <div className="card-info">
        <h1>Title</h1>
        <h3>Category</h3>
        <img className="card-img"/>
      </div>
      <div className="card-btn-container">
        <button>Update</button>
        <button id="card-delete-btn">Delete Board</button>
      </div>
    </div>
  )
}

export default Card
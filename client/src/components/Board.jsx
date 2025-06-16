import React from "react";
import '../styles/card.css'


const Board = () => {
  return (
    <div className="card-container">
      <div className="card-info">
        <img className="board-img" />
        <h1>Title</h1>
        <h3>Category</h3>
        <div className="board-btn-container">
          <button>View Board</button>
          <button id="board-delete-btn">Delete Board</button>
        </div>
      </div>
    </div>
  )
}

export default Board
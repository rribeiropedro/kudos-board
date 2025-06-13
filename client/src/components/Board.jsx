import React from "react";
import '../styles/board.css'


const Board = () => {
  return (
    <div className="card-container">
      <div className="card-info">
        <img />
        <h1>Title</h1>
        <h3>Category</h3>
        <div className="btn-container">
          <button>View Board</button>
          <button id="delete-btn">Delete Board</button>
        </div>
      </div>
    </div>
  )
}

export default Board
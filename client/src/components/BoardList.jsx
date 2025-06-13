import React from "react"
import Board from "./Board"
import '../styles/board-list.css'

const BoardList = () => {
  return (
    <div className="board-container">
      <div className="board-content">
        <div className="board-title">
          <h1>Boards</h1>
          <hr />
        </div>
        <div className="board-grid">
          <Board />
          <Board />
          <Board />
          <Board />
        </div>
      </div>
    </div>
  )
}

export default BoardList
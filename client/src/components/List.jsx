import React, { useState } from "react"
import Board from "./Board"
import Card from "./Card"
import '../styles/list.css'

const List = () => {

  const [isCard, setIsCard] = useState(true)

  return (
    <div className="grid-container">
      <div className="grid-content">
        <div className="grid-title">
          {isCard ? <h1>Card title</h1> : <h1>Boards</h1>}
          <hr />
        </div>
        <div className="grid">
          {isCard ? <Card /> : 
          <>
            <Board />
            <Board />
            <Board />
            <Board />
          </>
          }
          
        </div>
      </div>
    </div>
  )
}

export default List
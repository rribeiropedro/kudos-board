import React, { useState, useEffect } from "react"
import Board from "./Board"
import Card from "./Card"
import useKudos from "../hooks/useKudos"
import '../styles/list.css'

const CardList = () => {

  const { components, setComponents, currBoard, setCurrBoard } = useKudos()

  return (
    <div className="grid-container">
      <div className="grid-content">
        <div className="grid-title">
          <h1 style={{color: 'var(--text)'}}>{currBoard}</h1>
          <hr />
        </div>
        <div className="grid">
          {components.map((item) => (
            <Card 
              key={item.id}
              id={item.id}
              title={item.title}
              message={item.message}
              video={item.gifUrl}
              upvotes={item.upvotes}
              boardId={item.boardId}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CardList
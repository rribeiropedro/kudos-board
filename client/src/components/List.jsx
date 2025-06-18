import React, { useState, useEffect } from "react"
import Board from "./Board"
import Card from "./Card"
import useKudos from "../hooks/useKudos"
import '../styles/list.css'

const List = () => {

  const url = "http://localhost:3000/api/"
  const { components, setComponents, isCard, setIsCard, currBoard, setCurrBoard } = useKudos()

  useEffect(() => {
    fetch(url + "boards")
      .then(response => response.json())
      .then(data => setComponents(data))
      .catch(error => {console.error('Error fetching components:', error)})
  }, [])

  return (
    <div className="grid-container">
      <div className="grid-content">
        <div className="grid-title">
          {isCard ? <h1>{currBoard}</h1> : <h1>Boards</h1>}
          <hr />
        </div>
        <div className="grid">
          {components.map((item) => (
            isCard ? 
            (<Card 
              key={item.id}
              id={item.id}
              title={item.title}
              message={item.message}
              video={item.gifUrl}
              upvotes={item.upvotes}
              boardId={item.boardId}
            />) : (<Board
              key={item.id}
              id={item.id}
              title={item.title}
              category={item.category}
              img={item.imgUrl}
            />)
          ))}
        </div>
      </div>
    </div>
  )
}

export default List
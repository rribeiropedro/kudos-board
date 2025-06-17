import React, { useState } from "react"
import useKudos from "../hooks/useKudos"
import '../styles/features.css'

const Features = () => {

  const { currBoard, setCurrBoard, components, setComponents } = useKudos()

  const fetchBoards = (query, filter) => {
    let url = "http://localhost:3000/api/boards"
    query && (url += `?category=${query}`)
    fetch(url)
    .then(response => response.json())
    .then(data => {
      filter ? setComponents(data.slice(0, 6)) : setComponents(data)
    })
  }

  return (
    <div className="features-container">
      {currBoard ? (
        <>
          <h1>currBoard</h1>
          <div className="create-new-container">
            <button>Create a New Card</button>
          </div>
        </>
      ) : (
        <>
          <div className="search-container">
            <input placeholder="Search Boards..." className="search-input"/>
            <button>Search</button>
            <button>Clear</button>
          </div>
          <div className="sort-container">
            <button onClick={fetchBoards}>All</button>
            <button onClick={() => {
              fetchBoards("", true)
            }}>Recent</button>
            <button onClick={() => {
              fetchBoards("celebration")
            }}>Celebration</button>
            <button onClick={() => {
              fetchBoards("inspiration")
            }}>Inspiration</button>
            <button onClick={() => {
              fetchBoards("thank_you")
            }}>Thank You</button>
          </div>
          <div className="create-new-container">
            <button>Create a New Board</button>
          </div>
        </>
      )}
    </div>
  )
}

export default Features
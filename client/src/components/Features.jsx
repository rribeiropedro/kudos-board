import React, { useState } from "react"
import useKudos from "../hooks/useKudos"
import '../styles/features.css'

const Features = () => {

  const { currBoard, setCurrBoard } = useKudos()

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
            <button>Sort</button>
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
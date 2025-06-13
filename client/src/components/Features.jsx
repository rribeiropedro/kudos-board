import React from "react"
import '../styles/features.css'

const Features = () => {
  return (
    <div className="features-container">
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
    </div>
  )
}

export default Features
import React, { useState } from "react"
import '../styles/features.css'

const Features = () => {

  const [openedCard, setOpenedCard] = useState(true)

  return (
    <div className="features-container">
      {openedCard ? (
        <>
          <h1>Title</h1>
          <div className="create-new-container">
            <button>Create a New Board</button>
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
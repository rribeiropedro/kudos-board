import React, { useState } from "react"
import useKudos from "../hooks/useKudos"
import BoardModal from "./BoardModal"
import CardModal from "./CardModal"
import '../styles/features.css'

const Features = () => {
  const { 
    currBoard, 
    components, 
    setComponents, 
    toggleBoardModal, 
    setToggleBoardModal, 
    toggleCardModal, 
    setToggleCardModal } = useKudos()
  const [search, setSearch] = useState('')

  const fetchBoards = (query, filter) => {
    let url = "http://localhost:3000/api/boards"
    query && (url += `?category=${query}`)
    fetch(url)
    .then(response => response.json())
    .then(data => {
      filter ? setComponents(data.slice(0, 6)) : setComponents(data)
    })
  }

  const handleSearchSubmit = () => {
    const newList = [...components].filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    setComponents(newList)
  }

  const handleClearButton = () => {
    setSearch('')
    fetch("http://localhost:3000/api/boards")
      .then(response => response.json())
      .then(data => setComponents(data))
      .catch(error => {console.error('Error fetching components:', error)})
  }

  return (
    <>
      <div className="features-container">
      {currBoard ? (
        <>
          {toggleCardModal && <CardModal />}
          <h1 style={{marginTop: '20px'}}>{currBoard}</h1>
          <div className="create-new-container">
            <button style={{marginTop: '20px'}} onClick={() => setToggleCardModal(true)}>Create a New Card</button>
          </div>
        </>
      ) : (
        <>
          {toggleBoardModal && <BoardModal />}
          <div className="search-container">
            <input 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Boards..."
              className="search-input"
            />
            <button onClick={handleSearchSubmit}>Search</button>
            <button onClick={handleClearButton}>Clear</button>
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
            <button onClick={() => setToggleBoardModal(true)}>Create a New Board</button>
          </div>
        </>
      )}
    </div>
    </>
  )
}

export default Features
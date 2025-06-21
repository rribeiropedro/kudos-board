import React, { useState } from "react"
import useKudos from "../hooks/useKudos"
import BoardModal from "./BoardModal"
import CardModal from "./CardModal"
import { Navigate, useNavigate } from "react-router-dom"
import '../styles/features.css'

const Features = () => {
  const { 
    currBoard, 
    components, 
    setComponents, 
    toggleBoardModal, 
    setToggleBoardModal, 
    toggleCardModal, 
    setToggleCardModal
  } = useKudos()
  const [search, setSearch] = useState('')
  let url = import.meta.env.VITE_APP_SERVER_URL

  /**
   * This function takes in a query and a filter and sends a
   * GET request to the backend which responds with all the
   * board that matched those parameters, which is then
   * reflected on the cleint side.
   * 
   * @param {*} query - The input in the search container
   * for the desired board
   * @param {*} filter - Tells the request get all boards and
   * then only display the first 6.
   */
  const fetchBoards = (query, filter) => {
    query && (url += `boards?category=${query}`)
    filter && (url += "boards" )
    fetch(url)
      .then(response => response.json())
      .then(data => {
        filter ? setComponents(data.slice(0, 6)) : setComponents(data)
      })
  }

  /**
   * Filters out the current components in the state variable 
   * based off the query search and then updates the state variabel.
   */
  const handleSearchSubmit = () => {
    const newList = [...components].filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    setComponents(newList)
  }

  /**
   * Clears any state variable associated with filtering and then
   * sends a GET request for all boards and sets them for the client
   * side to view.
   */
  const handleClearButton = () => {
    setSearch('')
    fetch(url + "boards")
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
          <h1 style={{marginTop: '20px', color: 'var(--text)'}}>{currBoard}</h1>
          <div className="create-new-container">
            <button style={{marginTop: '20px'}} onClick={() => {
              setToggleCardModal(true)
            }}>Create a New Card</button>
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
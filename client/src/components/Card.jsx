import React from "react"
import '../styles/card.css'
import useKudos from "../hooks/useKudos"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faThumbtack} from "@fortawesome/free-solid-svg-icons"

const Card = ({ id, title, message, video, upvotes, boardId, pinned }) => {

  const { components, setComponents } = useKudos()
  const url = import.meta.env.VITE_APP_SERVER_URL

  /**
   * Sends a DELETE request to the server with the current
   * card Id, then updates the frontend to reflect the change.
   */
  const handleDeleteCard = () => {
    fetch(url + `cards/${id}`, {method: 'DELETE'})
      .then(response => {
        setComponents(components.filter(item => item.id !== id))
      })
  }

  /**
   * Sends a PUT request to the server with the card Id to 
   * increment the upvote count, and then updates the client
   * side to reflect the change.
   */
  const handleUpvote = () => {
    fetch(url + `cards/${id}/upvote`, {method: 'PUT'})
      .then(respone => respone.json())
      .then(data => {
        const index = components.findIndex(item => item.id === id)
        setComponents(prev => {
          const updatedList = [...prev]
          updatedList[index] = data
          return updatedList
        })
      })
  }

  /**
   * A helper function that fetches all the  cards from the
   * current board and sorts them primarily if they are pinned,
   * then by pin time, and then by creation time.
   * 
   * @returns The new sorted list
   */
  const sortWithPin = async () => {
    const response = await fetch(url + `cards/${boardId}`)
    const data = await response.json()
    const newList = [...data].sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return a.pinned ? -1 : 1;
      }
      if (a.pinned && b.pinned) {
        return new Date(b.pinnedTime) - new Date(a.pinnedTime);
      } else {
        return a.id - b.id;
      }
    })
    return newList
  }

  /**
   * Sends the server a PUT request with the card Id to 
   * turn the current pin boolean value to its NOT, then calls
   * a sorting helper function.
   */
  const handlePin = async () => {
    await fetch(url + `cards/${id}/pin`, {method: 'PUT'})
    const sorted = await sortWithPin()
    setComponents(sorted)
  }

  return (
    <div className="card-container">
      <div className="card-info">
        <div style={{display: 'flex', width: '100%', alignContent: 'center', justifyContent: 'space-between'}}>
          <h1>{title}</h1>
          <button style={{border: 'none', backgroundColor: 'transparent'}}onClick={handlePin}><FontAwesomeIcon style={pinned ? {color: 'var(--buttons)'} : {color: 'var(--text'}} icon={faThumbtack} /></button>
        </div>
        <h3>{message}</h3>
        <video 
          src={video}
          className="card-img"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className="card-btn-container">
        <button onClick={handleUpvote}>Update: {upvotes}</button>
        <button onClick={handleDeleteCard} id="card-delete-btn">Delete Board</button>
      </div>
    </div>
  )
}

export default Card
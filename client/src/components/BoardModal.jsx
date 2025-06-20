import React, { useState } from "react"
import useKudos from "../hooks/useKudos"
import '../styles/modal.css'

const BoardModal = () => {

  const { components, setComponents, setToggleBoardModal } = useKudos()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  const url = import.meta.env.VITE_APP_SERVER_URL

  const handleFormSubmit = (event) => {
    event.preventDefault()
    fetch(url + "boards", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        author: author,
        category: category.toUpperCase(),
      })
    })
      .then(response => response.json())
      .then(data => {
        setComponents(prev => [...prev, data])
      })
    setToggleBoardModal(false)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="close-container">
          <span 
            onClick={() => {
                setToggleBoardModal(false)
            }} 
            className="close">&times;
          </span>
        </div>
        <form className="form" onSubmit={handleFormSubmit}>
            <h1>Add New Board</h1>
            <hr />
            <div className="form-content">
              <div className="label-input-container">
                <label >Title</label>
                <input 
                  name="title" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div className="label-input-container">
                <label>Author</label>
                <input 
                  name="author"
                  value={author} 
                  onChange={e => setAuthor(e.target.value)}
                />
              </div>
              <div className="label-input-container">
                <label>Category</label>
                <select 
                  name="category"
                  value={category} 
                  onChange={e => setCategory(e.target.value)}
                >
                  <option value="" disabled defaultValue>Select</option>
                  <option value="inspiration">Inspiration</option>
                  <option value="celebration">Celebration</option>
                  <option value="thank_you">Thank You</option>
                </select>
              </div>
              <button className="form-submit" type="submit">Submit
              </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default BoardModal
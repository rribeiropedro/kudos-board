import React, { useState } from "react"
import useKudos from "../hooks/useKudos"
import '../styles/modal.css'

const CardModal = () => {

  const { setToggleCardModal, currBoardId, setComponents } = useKudos()
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [gifQuery, setGifQuery] = useState('')
  const [gifs, setGifs] = useState()
  const [gifUrl, setGifUrl] = useState('')
  const [gifSelected, setGifSelected] = useState(false)
  const giphyKey = import.meta.env.VITE_APP_GIPHY_KEY
  const url = import.meta.env.VITE_APP_SERVER_URL

  /**
   * This function takes in an event as the param
   * which prevents the form from refreshing the page, then
   * using the form data makes a GET request to the giphy
   * API to fetch the 6 top gifs based of the search.
   * 
   * @param {*} event - Form event which is used to 
   * prevent the page from refreshing.
   */
  const handleGifSubmit = (event) => {
    event.preventDefault()
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphyKey}&q=${gifQuery}&limit=6`, {method: 'GET'})
      .then(response => response.json())
      .then(res => setGifs(res.data))
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    fetch(url + "cards", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        message: message,
        gifUrl: gifUrl,
        boardId: currBoardId,
      })
    })
      .then(response => response.json())
      .then(data => {
        setComponents(prev => [...prev, data])
      })
    setToggleCardModal(false)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="close-container">
          <span 
            onClick={() => setToggleCardModal(false)} 
            className="close"
          >
            &times;
          </span>
        </div>
        <form className="form" onSubmit={handleFormSubmit}>
          <h1>Add New Card</h1>
          <hr />
          <div className="form-content">
            <div className="label-input-container">
              <label>Title</label>
              <input 
                name="title" 
                value={title} 
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="label-input-container">
              <label>Message</label>
              <input 
                name="message" 
                value={message} 
                onChange={e => setMessage(e.target.value)}
              />
            </div>
            <div className="label-input-container">
              {!gifSelected ? (
                <>
                  <label>Gifs</label>
                  <div style={{display: 'flex', gap:'20px', height: '100%'}}>
                    <input
                      className="gif-search-input" 
                      name="gifQuery"
                      value={gifQuery}
                      onChange={e => setGifQuery(e.target.value)}
                    />
                    <button 
                      className="gif-search-button"
                      onClick={handleGifSubmit}
                      type="button" 
                    >
                      Submit
                    </button>
                  </div>
                  {gifs && (
                    <div className="gif-grid">
                      {gifs.map(item => (
                        <video
                          key={item.id}
                          id={item.id} 
                          autoPlay
                          loop
                          muted
                          playsInline
                          onClick={() => {
                            setGifUrl(item.images.preview.mp4);
                            setGifSelected(true);
                            setGifs(null);
                          }}
                          src={item.images.preview.mp4}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <label>Gif Selected</label>
                  <input value={gifUrl} readOnly />
                </>
              )}
            </div>
            <button className="form-submit" type="submit">Create Card</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CardModal
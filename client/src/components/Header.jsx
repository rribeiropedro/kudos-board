import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons"
import useKudos from "../hooks/useKudos"

const Header = () => {

  const { components, setComponents, setIsCard, currBoard, setCurrBoard, setDarkMode } = useKudos()

  const navigate = useNavigate()

  const handleReturn = () => {
    fetch("http://localhost:3000/api/boards")
      .then(response => response.json())
      .then(data => {
        setCurrBoard('')
        navigate('/')
        setComponents(data)
        setIsCard(false)
      })
  }

  return (
    <>
      <header 
        style={{
          width: '100vw',
          height: '15vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'var(--background)'
        }}
      >
        {currBoard && (
          <button 
            style={{
              marginRight: 'auto',
              marginBottom: 'auto',
              marginLeft: '10px',
              marginTop: '10px',
              color: 'var(--text)',
              border: 'none',
              backgroundColor: 'transparent'
            }}
            onClick={handleReturn}
          ><FontAwesomeIcon size="3x" icon={faArrowLeft}></FontAwesomeIcon></button>
        )}
        <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
          <h1 style={{fontSize: '40px', color: 'var(--text)'}}>Kudos Board</h1>
          <button 
            style={{
              padding: '0px 10px',
              height: '60%',
              background: 'var(--background)',
              color: 'var(--text)',
              borderRadius: '20px'
            }}
            onClick={() => setDarkMode(prev => !prev)}
          >
            Toggle Mode
          </button>
        </div>
      </header>
    </>
  )
}

export default Header
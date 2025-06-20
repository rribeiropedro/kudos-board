import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons"
import useKudos from "../hooks/useKudos"

const Header = () => {

  const { components, setComponents, isCard, setIsCard, currBoard, setCurrBoard } = useKudos()

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
          background: '#f5f5f5'
        }}
      >
        {currBoard && (
          <button 
            style={{
              marginRight: 'auto',
              marginBottom: 'auto',
              marginLeft: '10px',
              marginTop: '10px',
              border: 'none',
              backgroundColor: 'transparent'
            }}
            onClick={handleReturn}
          ><FontAwesomeIcon size="3x" icon={faArrowLeft}></FontAwesomeIcon></button>
        )}
        <h1 style={{fontSize: '40px'}}>Kudos Board</h1>
      </header>
    </>
  )
}

export default Header
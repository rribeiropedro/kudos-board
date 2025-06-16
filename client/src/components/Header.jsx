import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons"

const Header = () => {

  const [toggleReturn, setToggleReturn] = useState(false)

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
        {toggleReturn && (
          <button style={{
            marginRight: 'auto',
            marginBottom: 'auto',
            marginLeft: '10px',
            marginTop: '10px',
            border: 'none',
            backgroundColor: 'transparent'
          }}><FontAwesomeIcon size="3x" icon={faArrowLeft}></FontAwesomeIcon></button>
        )}
        <h1 style={{fontSize: '40px'}}>Kudos Board</h1>
      </header>
    </>
  )
}

export default Header
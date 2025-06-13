import React from "react";

const Header = () => {

  return (
    <header 
      style={{
        width: '100vw',
        height: '15vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h1 style={{fontSize: '40px'}}>Kudos Board</h1>
    </header>
  )
}

export default Header
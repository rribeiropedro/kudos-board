import React, { createContext, useState, useMemo } from 'react'

const KudosContext = createContext(null)

export function KudosProvider({ children }) {
  const [components, setComponents] = useState([])
  const [isCard, setIsCard] = useState(false)
  const [currBoard, setCurrBoard] = useState('')
  const [toggleBoardModal, setToggleBoardModal] = useState(false)
  const value = useMemo(() => ({ 
    components, 
    setComponents, 
    isCard, 
    setIsCard,
    currBoard,
    setCurrBoard,
    toggleBoardModal,
    setToggleBoardModal
  }), [components, isCard, currBoard, toggleBoardModal])
  return (
    <KudosContext.Provider value={value}>
      {children}
    </KudosContext.Provider>
  )
}

export default KudosContext
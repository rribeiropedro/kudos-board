import React, { createContext, useState, useMemo } from 'react'

const KudosContext = createContext(null)

export function KudosProvider({ children }) {
  const [components, setComponents] = useState([])
  const [isCard, setIsCard] = useState(false)
  const [currBoard, setCurrBoard] = useState('')
  const [currBoardId, setCurrBoardId] = useState('')
  const [toggleBoardModal, setToggleBoardModal] = useState(false)
  const [toggleCardModal, setToggleCardModal] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const value = useMemo(() => ({ 
    components, 
    setComponents, 
    isCard, 
    setIsCard,
    currBoard,
    setCurrBoard,
    currBoardId,
    setCurrBoardId,
    toggleBoardModal,
    setToggleBoardModal,
    toggleCardModal,
    setToggleCardModal,
    darkMode,
    setDarkMode
  }), [components, isCard, currBoard, currBoardId, toggleBoardModal, toggleCardModal, darkMode])
  
  React.useEffect(() => {
    darkMode ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
  }, [darkMode])

  return (
    <KudosContext.Provider value={value}>
      {children}
    </KudosContext.Provider>
  )
}

export default KudosContext
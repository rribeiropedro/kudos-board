import React, { createContext, useState, useMemo } from 'react'

const ComponentContext = createContext(null)

export function ComponentProvider({ children }) {
  const [components, setComponents] = useState([])
  const value = useMemo(() => ({ components, setComponents }), [components])
  return (
    <ComponentContext.Provider value={value}>
      {children}
    </ComponentContext.Provider>
  );
}

export default ComponentContext;
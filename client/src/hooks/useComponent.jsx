import { useContext } from 'react'
import ComponentContext from '../context/ComponentContext'

export default function useComponent() {
  const context = useContext(ComponentContext)
  if (!context) throw new Error('useComponent must be used within a ComponentProvider')
  return context
}
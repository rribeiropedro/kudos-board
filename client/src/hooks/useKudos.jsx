import { useContext } from 'react'
import KudosContext from '../context/KudosContext'

export default function useKudos() {
  const context = useContext(KudosContext)
  if (!context) throw new Error('useKudos must be used within a KudosProvider')
  return context
}
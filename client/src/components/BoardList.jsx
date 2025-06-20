import React, { useState, useEffect } from "react"
import Board from "./Board"
import useKudos from "../hooks/useKudos"
import { useNavigate } from "react-router-dom"
import '../styles/list.css'

const BoardList = () => {

  const url = "http://localhost:3000/api/"
  const { components, setComponents } = useKudos()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(url + "boards")
      .then(response => response.json())
      .then(data => {
        setComponents(data)
        navigate('/')
      })
      .catch(error => {console.error('Error fetching components:', error)})
  }, [])

  return (
    <div className="grid-container">
      <div className="grid-content">
        <div className="grid-title">
          <h1 style={{color: 'var(--text)'}}>Boards</h1>
          <hr />
        </div>
        <div className="grid">
          {components.map((item) => (
            <Board
              key={item.id}
              id={item.id}
              title={item.title}
              category={item.category}
              img={item.imgUrl}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BoardList
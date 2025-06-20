import React, { useState } from "react"
import Header from "./components/Header"
import Features from "./components/Features"
import BoardList from "./components/BoardList"
import CardList from "./components/CardList"
import Footer from "./components/Footer"
import useKudos from "./hooks/useKudos"
import './styles/app.css'
import './styles/colors.css'

function App() {

  const { isCard } = useKudos() 

  return (
    <>
      <Header />
      <Features />
      {!isCard ? (
        <BoardList />
      ) : (
        <CardList />
      )} 
      <Footer />
    </>
  )
}

export default App
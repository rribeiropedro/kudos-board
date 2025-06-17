import React, { useState } from "react"
import Header from "./components/Header"
import Features from "./components/Features"
import List from "./components/List"
import Footer from "./components/Footer"
import { KudosProvider } from "./context/KudosContext"
import './styles/app.css'

function App() {
  return (
    <>
      <KudosProvider>
        <Header />
        <Features />
        <List />
      </KudosProvider>
      <Footer />
    </>
  )
}

export default App
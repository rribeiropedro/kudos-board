import React, { useState } from "react"
import Header from "./components/Header"
import Features from "./components/Features"
import List from "./components/List"
import Footer from "./components/Footer"
import './styles/app.css'

function App() {
  const [toggleCard, setToggleCard] = useState(true)
  return (
    <>
      <Header />
      <Features />
      <List />
      <Footer />
    </>
  )
}

export default App

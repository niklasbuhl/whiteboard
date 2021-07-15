import React, { Component, useState, useEffect } from 'react'
import './App.css'

import Tweet from './components/Tweet'
import InputVideo from './components/InputVideo'
import Login from './components/Login'
import Whiteboard from './components/Whiteboard'

function App() {

  /*

  const [login, setLogin] = useState(0);

  useEffect(() => {
    fetch('/checklogin').then(res => res.json()).then(data => {
      console.log(data.login)
      setLogin(data.login)
    })
  }, [])

  */

  // <InputVideo />

  return (
    <div className="App">
        <Login />
        <Tweet />
        <Whiteboard />
    </div>
  )
}

export default App

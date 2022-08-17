import React, { useState, useContext } from 'react'
import Login from './components/Login/Login'
import Register from './components/Login/Register'
import Confirm from './components/Login/Confirm'
import Home from './components/Home/Home'
import MainHeader from './components/MainHeader/MainHeader'
import AuthContext from './context/auth-context'

function App() {
  const ctx = useContext(AuthContext)
  // console.log('App ctx', ctx)

  return (
    <>
      <MainHeader />
      <main>
        {ctx.showLogin && <Login />}
        {!ctx.isRegistered && <Register />}
        {ctx.showAuth && <Confirm />}

        {ctx.isLoggedIn && <Home loggedInUser={ctx.user} />}
      </main>
    </>
  )
}

export default App


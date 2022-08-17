import React, { useState } from 'react'
import axios from 'axios'

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (username, email, password) => {},
})

export const AuthContextProvider = (props) => {
  const [loggedIn, setIsLoggedIn] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [registered, setRegistered] = useState(true)
  const [showHome, setShowHome] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState({ name: '', id: '' })
  const [newUser, setNewUser] = useState(false)
  const [error, setError] = useState('')
  const [auth, setAuth] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [email, setEmail] = useState('')
  const [forgot, setForgot] = useState(false)

  const logoutHandler = () => {
    console.log('loggedInUser', loggedInUser)
    const logoutUrl = `/users/logout/${loggedInUser}`
    const res = axios.get(logoutUrl) // jwt cookie removed on backend
    setIsLoggedIn(false)
    setLoggedInUser('')
    setNewUser(false)
    setShowLogin(true)
    return res.data
  }

  const loginHandler = async (credentials) => {
    const baseUrl = '/users/login'
    try {
      const response = await axios.post(baseUrl, credentials)
      setIsLoggedIn(true)
      setShowLogin(false)
      setShowHome(true)
      setLoggedInUser(response.data.name)
      setError('')
      return response.data
    } catch (error) {
      console.log('login error', error)
      setShowLogin(true)
      setError(error.response.data.message)
    }
  }

  const registerHandler = async (credentials) => {
    //  console.log('register credentials', credentials)
    const registerUrl = '/users/signup'
    try {
      const response = await axios.post(registerUrl, credentials)
      if (response.data.error) {
        setError(response.data.message)
        setRegistered(false)
        return error
      } else {
        setError('')
        setRegistered(true)
        setNewUser(true)
        setShowAuth(true)
        setEmail(credentials.email)
        console.log('register response.data', response.data)

        return response.data
      }
    } catch (err) {
      console.log('register axios error', err.response.data)
      setRegistered(false)
      setError(err.response.data.message)
    }
  }

  const authHandler = async (params) => {
    //   console.log('auth code params', params)
    const authUrl = '/users/activate'
    try {
      const response = await axios.patch(authUrl, params)
      setAuth(false)
      setShowAuth(false)
      setShowLogin(true)
      setError('')
      return response.data
    } catch (err) {
      setAuth(true)
      setShowAuth(true)
      setError(err.response.data.message)
      console.log('authorization error', err)
    }
  }

  const forgotHandler = async (email) => {
    const forgotUrl = '/users/forgot'
    try {
      const response = await axios.patch(forgotUrl, email)
      setForgot(false)
      setError('')
      return response.data
    } catch (error) {
      setForgot(true)
      setError(error.response.data.message)
    }
  }

  const toggleShowRegisterForm = () => {
    // used on login page to toggle register form
    // used again on register page to cancel & go back to login
    setError('')
    showLogin === true ? setShowLogin(false) : setShowLogin(true)
    registered === true ? setRegistered(false) : setRegistered(true)
  }

  const handleNew = () => {
    setNewUser(false)
  }

  return (
    <AuthContext.Provider
      value={{
        showHome: showHome,
        isRegistered: registered,
        isLoggedIn: loggedIn,
        showLogin: showLogin,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onRegister: registerHandler,
        onAuth: authHandler,
        auth: auth,
        showAuth: showAuth,
        user: loggedInUser,
        showRegisterToggle: toggleShowRegisterForm,
        new: newUser,
        setNew: handleNew,
        error: error,
        userEmail: email,
        showForgot: forgot,
        onForgot: forgotHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext

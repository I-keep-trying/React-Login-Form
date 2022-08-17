import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth-context'
import Navigation from './Navigation'
import classes from './MainHeader.module.css'

const MainHeader = () => {
  const [title, setTitle] = useState('Login Page')
  const ctx = useContext(AuthContext)
 // console.log('Header ctx', ctx)

  useEffect(() => {
    if (ctx.showLogin) {
     // console.log('LOGIN PAGE')
      setTitle('Login Page')
    } else if (!ctx.isRegistered) {
    //  console.log('REGISTER PAGE')
      setTitle('Register')
    } else if (ctx.showAuth) {
    //  console.log('AUTH PAGE')
      setTitle('Authorization')
    } else if (ctx.showHome) {
    //  console.log('HOME PAGE')
      setTitle('Home Page')
    } else {
      setTitle('Oops')
    }
  }, [ctx])

  return (
    <header className={classes['main-header']}>
      <h1>{title} </h1>
      <span>{ctx.error} </span>
      <Navigation />
    </header>
  )
}

export default MainHeader

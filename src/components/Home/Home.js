import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth-context'
import Button from '../UI/Button/Button'

import Card from '../UI/Card/Card'
import classes from './Home.module.css'

const Home = ({ loggedInUser }) => {
  const ctx = useContext(AuthContext)
  console.log('Home ctx', ctx)

  const message = () => {
    const msg = ctx.new ? `Welcome, ${ctx.user}!` : `Welcome back, ${ctx.user}!`
    return msg
  }

  return (
    <Card className={classes.home}>
      <h2>{message()}</h2>
      <Button onClick={ctx.onLogout}>Logout</Button>
    </Card>
  )
}

export default Home

import React, { useState, useContext, useRef } from 'react'
import Card from '../UI/Card/Card'
import AuthContext from '../../context/auth-context'
import Input from './Input'
import Button from '../UI/Button/Button'
import classes from './Login.module.css'

const Forgot = () => {
  const [input, setInput] = useState('')

  const ctx = useContext(AuthContext)

  const inputChange = (e) => {
    setInput(e.target.value)
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    console.log('input', input)
    const userEmail = ctx.userEmail
    await ctx.onAuth({ email: userEmail, code: input })
  }

  const emailInputRef = useRef()

  return (
    <Card className={classes.login}>
      <h4>Forgot Password</h4>
      <p>
        {`Enter the email you registered with. A reset code will be sent to you.`}{' '}
      </p>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          title={'Email'}
          value={input}
          onChange={inputChange}
        />
        <Button type="submit" className={classes.btn}>
          Submit
        </Button>
      </form>
    </Card>
  )
}

export default Forgot

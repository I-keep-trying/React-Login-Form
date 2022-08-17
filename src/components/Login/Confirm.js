import React, {
  useState,
  useContext,
  useRef,
} from 'react'
import Card from '../UI/Card/Card'
import AuthContext from '../../context/auth-context'
import Input from './Input'
import Button from '../UI/Button/Button'
import classes from './Login.module.css'

const Confirm = () => {
  const [input, setInput] = useState('')

  const ctx = useContext(AuthContext)

  const codeChangeHandler = (event) => {
    setInput(event.target.value)
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    console.log('input', input)
    const userEmail = ctx.userEmail
    await ctx.onAuth({ email: userEmail, code: input })
  }

  const codeInputRef = useRef()

  return (
    <Card className={classes.login}>
      <h4>Registration</h4>
      <p>{`An authorization code has been sent to your email.`} </p>
      <p>{`It expires in 15 minutes.`} </p>
      <form onSubmit={submitHandler}>
        <Input
          ref={codeInputRef}
          title={'Code'}
          value={input}
          onChange={codeChangeHandler}
        />
        <Button type="submit" className={classes.btn}>
          Confirm
        </Button>
      </form>
    </Card>
  )
}

export default Confirm

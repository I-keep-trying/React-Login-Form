import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from 'react'
import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'
import AuthContext from '../../context/auth-context'
import Input from './Input'

const Login = ({ login, handleRegister }) => {
  const ctx = useContext(AuthContext)
  // console.log('Login ctx', ctx)
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const usernameInputRef = useRef()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  useEffect(() => {
    const timer = setTimeout(() => {
     // console.log('start')
    }, 500)
    return () => {
     // console.log('clear')
      clearTimeout(timer)
    }
  }, [])

  const usernameChangeHandler = (event) => {
    setUserName(event.target.value)
  }

  const emailChangeHandler = (event) => {
    setEmail(event.target.value)
  }

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value)
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    ctx.onLogin({ email, password })
  }

  const handleClick = () => {
    handleRegister()
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        dre.crego@gmail.com
        {/* <Input
          ref={usernameInputRef}
          title={'Username'}
          value={username}
          onChange={usernameChangeHandler}
        /> */}
        <Input
          ref={emailInputRef}
          title={'E-mail'}
          id={'email'}
          value={email}
          onChange={emailChangeHandler}
        />
        <Input
          ref={passwordInputRef}
          title={'Password'}
          id={'password'}
          value={password}
          onChange={passwordChangeHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
        <div className={classes.actions}>
          Don't have an account?{' '}
          <span onClick={ctx.showRegisterToggle}>Register here.</span>
        </div>
      </form>
    </Card>
  )
}

export default Login

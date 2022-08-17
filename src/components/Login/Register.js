import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from 'react'
import PasswordStrengthBar from 'react-password-strength-bar'
import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'
import AuthContext from '../../context/auth-context'
import Input from './Input'

const Register = () => {
  const ctx = useContext(AuthContext)

  const [name, setName] = useState('')
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const nameInputRef = useRef()
  const usernameInputRef = useRef()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const nameChangeHandler = (event) => {
    setName(event.target.value)
  }

  const emailChangeHandler = (event) => {
    setEmail(event.target.value)
  }

  const usernameChangeHandler = (event) => {
    setUserName(event.target.value)
  }

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value)
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    // const password = passwordState.value
    await ctx.onRegister({ name, email, password })
  }

  /*   const err = ctx.error
  console.log('err', err)
  useEffect(() => {
    const handleErr = () => {
      alert(err)
      if (err.includes(username)) {
        setUserName('')
      }
    }
    err === '' ? console.log('no error', err) : handleErr()
  }, [err]) */

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        dre.crego@gmail.com
        {/*         <Input
          ref={nameInputRef}
          title={'Name'}
          value={name}
          onChange={nameChangeHandler}
        />
        <Input
          ref={usernameInputRef}
          title={'Username'}
          value={username}
          onChange={usernameChangeHandler}
        /> */}
        <Input
          ref={nameInputRef}
          title={'Name'}
          value={name}
          onChange={nameChangeHandler}
        />
        <Input
          ref={emailInputRef}
          id={'email'}
          title={'Email'}
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
        <PasswordStrengthBar minLength={8} password={password} />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Register
          </Button>
          <Button onClick={ctx.showRegisterToggle} className={classes.btn}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Register

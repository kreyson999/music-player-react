import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { signInWithGoogle, signUpWithEmail } from '../services/auth';
import { useAuth } from '../contexts/AuthContext'
import { validateForm } from '../helpers/validateForm';

import { Button, Input } from '../components'
import '../styles/AuthPage.scss'

function SignUpPage() {
  const currentUser = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({name: false, email: false, password: false})
  const [loginError, setLoginError] = useState('')
  
  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])
  
  const handleSignUp = async (e) => {
    e.preventDefault()
    // check if the form inputs are valid
    const isValidated = validateForm([
      {name: "name", value: name}, 
      {name: "email", value: email},
      {name: "password", value: password},
    ], setErrors)

    if (!isValidated) return

    // sign up user and create his document in the database
    const result = await signUpWithEmail({ name, email, password })
    if (result !== true) {
      setLoginError(result)
    }
  }

  const handleLoginWithGoogle = async (e) => {
    e.preventDefault()
    let isMounted = true
    const result = await signInWithGoogle()

    if (isMounted && result !== true) {
      setLoginError(result)
    }

    return () => isMounted = false
  }

  const onChangeName = (e) => {
    setName(e.target.value)
  }
  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className='loginpage'>
      <div className="loginpage__container">
        <div className="loginpage__top">
          <h1 className='heading'>Create new account<span>.</span></h1>
          <p className='loginpage__top__paragraph'>Already have an account? <Link to='/signin'>Sign In</Link></p>
        </div>
        <div className='form'>
          <Input
            value={name}
            onChange={onChangeName}
            type='text'
            placeholder={'Nickname'}
            icon={'/music-player-react/assets/icons/user.svg'}
            error={errors.name}
          />
          <Input
            value={email}
            onChange={onChangeEmail}
            type='email'
            placeholder={'E-mail'}
            icon={'/music-player-react/assets/icons/mail.svg'}
            error={errors.email}
          />
          <Input
            value={password}
            onChange={onChangePassword}
            type='password'
            placeholder={'Password'}
            icon={'/music-player-react/assets/icons/lock.svg'}
            error={errors.password}
          />
        </div>
        {loginError.length > 0 && (<span className='error__message'>{loginError}</span>)}
        <hr />
        <div className="loginpage__bottom">
          <Button 
            onClick={handleSignUp}
            isPrimary={true}
            text={"Sign Up"} 
          />
          <Button 
            onClick={handleLoginWithGoogle}
            text={"Use Google"} 
            image={"/music-player-react/assets/googlelogo.png"}
          />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
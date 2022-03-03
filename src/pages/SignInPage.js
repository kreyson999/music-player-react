import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext'

import { Button, Input } from '../components'
import '../styles/LoginPage.scss'
import { validateForm } from '../helpers/validateForm';
import { signInWithGoogle, signInWithEmail } from '../services/auth';

function SignUpPage() {
  const currentUser = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({email: false, password: false})
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
      {name: "email", value: email},
      {name: "password", value: password},
    ], setErrors)

    if (!isValidated) return

    // sign up user and create his document in the database
    const result = await signInWithEmail({ email, password })
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
          <h1 className='heading'>Sign In to your account<span>.</span></h1>
          <p className='loginpage__top__paragraph'>Do not have an account? <Link to='/signup'>Sign Up</Link></p>
        </div>
        <div className='form'>
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
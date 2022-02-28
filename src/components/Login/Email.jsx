import { useState } from 'react'

import { validateForm } from '../../helpers/validateForm'
import { LOGIN_PAGES } from '../../helpers/LoginHelper'
import { signInWithEmail } from '../../services/auth'

const Email = ({ setCurrentLoginPage }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({email: false, password: false})
  const [loginError, setLoginError] = useState('')
  
  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    const isValidated = validateForm([
      {name: "email", value: email},
      {name: "password", value: password},
    ], setErrors)

    if (!isValidated) return

    const result = await signInWithEmail({ email, password })
    if (result !== true) {
      setLoginError(result)
    }
  }

  return (
    <>
      <h1 className="login__header">
        <div onClick={() => setCurrentLoginPage(LOGIN_PAGES.home)} className="login__header__img">
          <img src="assets/left_icon.svg" alt="Go back"/>
        </div>
        <span>Sign In:</span>
      </h1>
      <hr/>
      <form className="login__form">
        <label className='login__form__label' htmlFor="email">Your e-mail:</label>
        <input 
          className='login__form__input' 
          type="email" 
          id="email" 
          placeholder="E-mail"
          value={email}
          onChange={onChangeEmail}
        />
        {errors.email && <span className='login__form__error'>E-mail is incorrect!</span>}
        <label className='login__form__label' htmlFor="password">Your password:</label>
        <input 
          className='login__form__input' 
          type="password" 
          id="password" 
          placeholder="Hasło"
          value={password}
          onChange={onChangePassword}
        />
        {errors.password && <span className='login__form__error'>Password should have atleast 8 characters!</span>}
        <button className='login__form__button' onClick={handleLogin}>Sign In</button>
        {loginError && <span className='login__form__error'>{loginError}</span>}
      </form>
    </>
  );
}
 
export default Email;
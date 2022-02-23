import {useState} from 'react'

import { LOGIN_PAGES } from '../../helpers/LoginHelper'
import { signIn } from '../../services/auth'

const Email = ({setCurrentPage}) => {
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

  const validateForm = () => {
    let isValidated = true
    if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
      isValidated = false
      setErrors(state => ({...state, email: true}))
    } else {
      setErrors(state => ({...state, email: false}))
    }
    if (password.length < 8) {
      isValidated = false
      setErrors(state => ({...state, password: true}))
    } else {
      setErrors(state => ({...state, password: false}))
    }
    return isValidated
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const isValidated = validateForm()
    if (!isValidated) return
    const result = await signIn(email, password)
    if (result !== true) {
      setLoginError(result)
    }
  }

  return (
    <>
      <h1 className="login__header">
        <div onClick={() => setCurrentPage(LOGIN_PAGES.home)} className="login__header__img">
          <img src="assets/left_icon.svg" alt="Wróć"/>
        </div>
        <span>Zaloguj się:</span>
      </h1>
      <hr/>
      <form className="login__form">
        <label className='login__form__label' htmlFor="email">Podaj swój adres e-mail:</label>
        <input 
        className='login__form__input' 
        type="email" 
        id="email" 
        placeholder="E-mail"
        value={email}
        onChange={onChangeEmail}
        />
        {errors.email && <span className='login__form__error'>Podany email jest nieprawidłowy!</span>}
        <label className='login__form__label' htmlFor="password">Podaj swoje hasło:</label>
        <input 
        className='login__form__input' 
        type="password" 
        id="password" 
        placeholder="Hasło"
        value={password}
        onChange={onChangePassword}
        />
        {errors.password && <span className='login__form__error'>Hasło musi mieć co najmniej 8 znaków!</span>}
        <button className='login__form__button' onClick={handleLogin}>Zaloguj się</button>
        {loginError && <span className='login__form__error'>{loginError}</span>}
      </form>
    </>
  );
}
 
export default Email;
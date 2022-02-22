import { useState } from 'react';
import { LOGIN_PAGES } from '../../helpers/LoginHelper'
import { signUp } from '../../services/auth';

const Register = ({setCurrentPage}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({name: false, email: false, password: false})
  const [loginError, setLoginError] = useState('')
  
  const onChangeName = (e) => {
    setName(e.target.value)
  }
  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const validateForm = () => {
    let isValidated = true
    if (name.length < 6) {
      isValidated = false
      setErrors(state => ({...state, name: true}))
    } else {
      setErrors(state => ({...state, name: false}))
    }
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

  const handleRegister = async (e) => {
    e.preventDefault()
    const isValidated = validateForm()
    if (!isValidated) return
    // signUp user and create his document
    const result = await signUp(name, email, password)
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
        <span>Zarejestuj się:</span>
      </h1>
      <hr/>
      <form className="login__form">
        <label className='login__form__label' htmlFor="name">Podaj swój pseudonim:</label>
        <input 
        className='login__form__input' 
        type="text" 
        id="name" 
        placeholder="Pseudonim"
        value={name}
        onChange={(e) => onChangeName(e)}
        />
        {errors.name && <span className='login__form__error'>Pseudonim użytkownika musi mieć co najmniej 6 znaków!</span>}
        <label className='login__form__label' htmlFor="email">Podaj swój adres e-mail:</label>
        <input 
        className='login__form__input' 
        type="email" 
        id="email" 
        placeholder="E-mail"
        value={email}
        onChange={(e) => onChangeEmail(e)}
        />
        {errors.email && <span className='login__form__error'>Podany email jest nieprawidłowy!</span>}
        <label className='login__form__label' htmlFor="password">Podaj swoje hasło:</label>
        <input 
        className='login__form__input' 
        type="password" 
        id="password" 
        placeholder="Hasło"
        value={password}
        onChange={(e) => onChangePassword(e)}
        />
        {errors.password && <span className='login__form__error'>Hasło musi mieć co najmniej 8 znaków!</span>}
        <button className='login__form__button'onClick={handleRegister}>Zarejestuj się</button>
        {loginError && <span className='login__form__error'>{loginError}</span>}
      </form>
    </>
  );
}
 
export default Register;
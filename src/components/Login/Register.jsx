import { useState } from 'react';
import { LOGIN_PAGES } from '../../helpers/LoginHelper'
import { validateForm } from '../../helpers/validateForm';
import { signUpWithEmail } from '../../services/auth';

const Register = ({ setCurrentLoginPage }) => {
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

  const handleRegister = async (e) => {
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

  return (
    <>
      <h1 className="login__header">
        <div onClick={() => setCurrentLoginPage(LOGIN_PAGES.home)} className="login__header__img">
          <img src="assets/left_icon.svg" alt="Wróć"/>
        </div>
        <span>Sign Up:</span>
      </h1>
      <hr/>
      <form className="login__form">
        <label className='login__form__label' htmlFor="name">Your nickname:</label>
        <input 
          className='login__form__input' 
          type="text" 
          id="name" 
          placeholder="Nickname"
          value={name}
          onChange={(e) => onChangeName(e)}
        />
        {errors.name && <span className='login__form__error'>User nickname should have atleast 6 characters!</span>}
        <label className='login__form__label' htmlFor="email">Your e-mail:</label>
        <input 
          className='login__form__input' 
          type="email" 
          id="email" 
          placeholder="E-mail"
          value={email}
          onChange={(e) => onChangeEmail(e)}
        />
        {errors.email && <span className='login__form__error'>E-mail is incorrect!</span>}
        <label className='login__form__label' htmlFor="password">Your password:</label>
        <input 
          className='login__form__input' 
          type="password" 
          id="password" 
          placeholder="Hasło"
          value={password}
          onChange={(e) => onChangePassword(e)}
        />
        {errors.password && <span className='login__form__error'>Password should have atleast 8 characters!</span>}
        <button className='login__form__button'onClick={handleRegister}>Sign Up</button>
        {loginError && <span className='login__form__error'>{loginError}</span>}
      </form>
    </>
  );
}
 
export default Register;
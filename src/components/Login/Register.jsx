import { useState } from 'react';
import { LOGIN_PAGES } from '../../helpers/LoginHelper'
import { signUp } from '../../services/auth';

const Register = ({setCurrentPage}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await signUp(email, password)
    } catch (error) {
      console.log(error)
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
        <input className='login__form__input' type="text" id="name" placeholder="Pseudonim"/>
        <label className='login__form__label' htmlFor="email">Podaj swój adres e-mail:</label>
        <input 
        className='login__form__input' 
        type="email" 
        id="email" 
        placeholder="E-mail"
        value={email}
        onChange={(e) => onChangeEmail(e)}
        />
        <label className='login__form__label' htmlFor="password">Podaj swoje hasło:</label>
        <input 
        className='login__form__input' 
        type="password" 
        id="password" 
        placeholder="Hasło"
        value={password}
        onChange={(e) => onChangePassword(e)}
        />
        <button className='login__form__button'onClick={handleRegister}>Zarejestuj się</button>
      </form>
    </>
  );
}
 
export default Register;
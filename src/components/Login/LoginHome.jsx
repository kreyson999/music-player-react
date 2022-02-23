import { useState } from 'react'

import { LOGIN_PAGES } from "../../helpers/LoginHelper";
import { signInWithGoogle } from "../../services/auth";

const LoginHome = ({setCurrentPage}) => {
  const [loginError, setLoginError] = useState('')

  const loginWithGoogle = async (e) => {
    e.preventDefault()
    let mounted = true
    const result = await signInWithGoogle()
    if (mounted && result !== true) {
      setLoginError(result)
    }
    return () => mounted = false
  }

  return (
    <>
      <h1 className="login__header">Zaloguj się przez:</h1>
      <button onClick={() => setCurrentPage(LOGIN_PAGES.email)} className="login__button">E-mail</button>
      <button onClick={loginWithGoogle} className="login__button">Google</button>
      <p className="login__p login__p--right">
        Nie masz jeszcze konta? {""}
        <span className="login__p__span" onClick={() => setCurrentPage(LOGIN_PAGES.register)}>Zarejestruj się!</span>
      </p>
      {loginError && <span className='login__form__error'>{loginError}</span>}
    </>
  );
}
 
export default LoginHome;
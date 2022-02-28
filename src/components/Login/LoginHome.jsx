import { useState } from 'react'

import { LOGIN_PAGES } from "../../helpers/LoginHelper";
import { signInWithGoogle } from "../../services/auth";

const LoginHome = ({ setCurrentLoginPage }) => {
  const [loginError, setLoginError] = useState('')

  const loginWithGoogle = async (e) => {
    e.preventDefault()
    let isMounted = true
    const result = await signInWithGoogle()

    if (isMounted && result !== true) {
      setLoginError(result)
    }

    return () => isMounted = false
  }

  return (
    <>
      <h1 className="login__header">Sign In using:</h1>
      <button onClick={() => setCurrentLoginPage(LOGIN_PAGES.email)} className="login__button">E-mail</button>
      <button onClick={loginWithGoogle} className="login__button">Google</button>
      <p className="login__p login__p--right">
        Do not have an account? {""}
        <span className="login__p__span" onClick={() => setCurrentLoginPage(LOGIN_PAGES.register)}>Sign Up!</span>
      </p>
      {loginError && <span className='login__form__error'>{loginError}</span>}
    </>
  );
}
 
export default LoginHome;
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import Email from '../components/Login/Email'
import LoginHome from '../components/Login/LoginHome'
import Register from '../components/Login/Register'

import { useAuth } from '../contexts/AuthContext'
import { LOGIN_PAGES } from '../helpers/LoginHelper'

import '../styles/LoginPage.scss'

function LoginPage() {
  const currentUser = useAuth()
  const navigate = useNavigate()
  
  useEffect(() => {
    let isMounted = true
    if (isMounted && currentUser) {
      navigate('/')
    }
    return () => isMounted = false
  }, [currentUser, navigate])
  
  const [currentLoginPage, setCurrentLoginPage] = useState(LOGIN_PAGES.home)
  
  const getCurrentLoginPage = () => {
    switch (currentLoginPage) {
      case LOGIN_PAGES.email:
        return <Email setCurrentLoginPage={setCurrentLoginPage}/>
      case LOGIN_PAGES.register:
        return <Register setCurrentLoginPage={setCurrentLoginPage}/>
      default:
        return <LoginHome setCurrentLoginPage={setCurrentLoginPage}/>
    }
  }

  return (
    <div className='login__container'>
      <div className="login">
        {getCurrentLoginPage()}
      </div>
    </div>
  );
}

export default LoginPage;
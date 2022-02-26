import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext'
import Email from '../components/Login/Email'
import LoginHome from '../components/Login/LoginHome'
import Register from '../components/Login/Register'
import { LOGIN_PAGES } from '../helpers/LoginHelper'

import '../styles/LoginPage.scss'

function LoginPage() {
  const currentUser = useAuth()
  const navigate = useNavigate()
  
  useEffect(() => {
    let mounted = true
    if (mounted && currentUser) {
      navigate('/')
    }
    return () => mounted = false
  }, [currentUser, navigate])
  
  const [currentPage, setCurrentPage] = useState(LOGIN_PAGES.home)
  
  const getCurrentPage = () => {
    switch (currentPage) {
      case LOGIN_PAGES.email:
        return <Email setCurrentPage={setCurrentPage}/>
      case LOGIN_PAGES.register:
        return <Register setCurrentPage={setCurrentPage}/>
      default:
        return <LoginHome setCurrentPage={setCurrentPage}/>
    }
  }

  return (
    <div className='login__container'>
      <div className="login">
        {getCurrentPage()}
      </div>
    </div>
  );
}

export default LoginPage;
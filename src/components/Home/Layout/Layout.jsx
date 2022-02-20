import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAuth } from '../../../contexts/AuthContext'
import './Layout.scss'

const Layout = () => {
  const currentUser = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  })

  return ( 
    <>
      <nav className='navbar'>
        <div className="navbar__logo">

        </div>
        <form className="navbar__searchbar">
          <input placeholder='Szukaj'/>
        </form>
      </nav>
      <div className='pageBody'>
        <Outlet/>
      </div>
      <footer className='footer'>
        Footer
      </footer>
    </>
  );
}
 
export default Layout;
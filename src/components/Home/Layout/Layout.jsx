import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAuth } from '../../../contexts/AuthContext'
import './Layout.scss'

const Layout = () => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const currentUser = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  })

  const handleSearchBar = () => {
    setIsSearchBarOpen(state => !state)
  }

  const handleMenu = () => {
    setIsMenuOpen(state => !state)
  }

  return ( 
    <>
      <nav className={`navbar ${isSearchBarOpen ? 'navbar--searchbaropen' : ''}`}>
        <div className="navbar__logo">
          <img src='/assets/logo.svg' alt='LOGO'/>
        </div>
        <form className="navbar__searchbar">
          <input className='navbar__searchbar__input' placeholder='Szukaj'/>
        </form>
        <div className='navbar__buttons'>
          <button 
          onClick={handleSearchBar}
          className='navbar__buttons__iconbutton'>
            <img src={isSearchBarOpen ? 'assets/close.svg' : 'assets/search.svg'} alt={isSearchBarOpen ? 'Close Menu' : 'Open Search'}/>
          </button>
          <button onClick={handleMenu} className='navbar__buttons__iconbutton navbar__buttons__iconbutton--hide'>
            <img src={isMenuOpen ? 'assets/close.svg' : 'assets/menu.svg'} alt={isSearchBarOpen ? 'Close Menu' : 'Open Menu'}/>
          </button>
        </div>
      </nav>
      <div className='page__body'>
        <aside className={`page__body__aside ${isMenuOpen ? 'page__body__aside--open' : ''}`}>
          aside
        </aside>
        <main className='page__body__main'>
          <Outlet/>
        </main>     
      </div>
      <footer className='footer'>
        <div className='footer__buttons'>
          <button className='footer__buttons__iconbutton footer__buttons__previous'>
            <img src='assets/left_icon.svg' alt='Left Icon'/>
          </button>
          <button className='footer__buttons__iconbutton footer__buttons__play'>
            <img src='assets/play-circle.svg' alt='Play Icon'/>
          </button>
          <button className='footer__buttons__iconbutton footer__buttons__next'>
            <img src='assets/right_icon.svg' alt='Left Icon'/>
          </button>
        </div>
        <div className='footer__progressbar'>
          <span>0:00</span>
          <progress max={100} value={60}></progress>
          <span>3:33</span>
        </div>
      </footer>
    </>
  );
}
 
export default Layout;
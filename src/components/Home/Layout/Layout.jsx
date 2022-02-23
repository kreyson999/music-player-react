import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAuth } from '../../../contexts/AuthContext'
import { MusicProvider } from '../../../contexts/MusicContext';
import { UserProvider } from '../../../contexts/UserContext';
import ProfileButton from '../ProfileButton/ProfileButton';
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
    <UserProvider>
      <MusicProvider>
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
            className='navbar__buttons__iconbutton navbar__buttons__iconbutton--mobile-only'>
              <img src={isSearchBarOpen ? 'assets/close.svg' : 'assets/search.svg'} alt={isSearchBarOpen ? 'Close Menu' : 'Open Search'}/>
            </button>
            <button onClick={handleMenu} className='navbar__buttons__iconbutton navbar__buttons__iconbutton--hide navbar__buttons__iconbutton--mobile-only'>
              <img src={isMenuOpen ? 'assets/close.svg' : 'assets/menu.svg'} alt={isSearchBarOpen ? 'Close Menu' : 'Open Menu'}/>
            </button>
            <ProfileButton/>
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
          <div className='footer__timeline'>
            <span>0:00</span>
            <div className='footer__timeline__progressbar'>
              <div 
              style={{
                width: `60%`
              }}
              className='footer__timeline__progressbar__progress'>
                <div className='footer__timeline__progressbar__progress__circle'></div>
              </div>
            </div>
            <span>3:33</span>
          </div>
        </footer>
      </MusicProvider>
    </UserProvider>
  );
}
 
export default Layout;
import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

import { useAuth } from '../../../contexts/AuthContext'
import { MusicProvider } from '../../../contexts/MusicContext';
import { UserProvider } from '../../../contexts/UserContext';

import ProfileButton from '../ProfileButton/ProfileButton';
import LayoutFooter from './LayoutFooter';

import './Layout.scss'
import { getUserPlaylists } from '../../../services/database';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [playlists, setPlaylists] = useState([])
  const userAuth = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userAuth) {
      navigate('/login')
    }
  })

  useEffect(() => {
    let isMounted = true
    if (userAuth) {
      async function getUserPlaylistsFromDatabase() {
        const playlistsFromDatabase = await getUserPlaylists(userAuth.uid)
        if (isMounted) {
          setPlaylists(playlistsFromDatabase)
        }
      }
      getUserPlaylistsFromDatabase()
    }
    return () => isMounted = false
  }, [userAuth])

  const handleMenu = () => {
    setIsMenuOpen(state => !state)
  }

  return ( 
    <UserProvider>
      <MusicProvider>
        <nav className={`navbar`}>
          <Link to={'/'} className="navbar__logo">
            <img src='assets/logo.svg' alt='LOGO'/>
          </Link>
          <div className='navbar__buttons'>
            <button onClick={handleMenu} className='navbar__buttons__iconbutton navbar__buttons__iconbutton--hide navbar__buttons__iconbutton--mobile-only'>
              <img src={isMenuOpen ? 'assets/close.svg' : 'assets/menu.svg'} alt={isMenuOpen ? 'Close Menu' : 'Open Menu'}/>
            </button>
            <ProfileButton/>
          </div>
        </nav>
        <div className='page__body'>
          <aside className={`page__body__aside ${isMenuOpen ? 'page__body__aside--open' : ''}`}>
            <NavLink to={"/"} className={"page__body__aside__navlink"}>
              Home
            </NavLink>
            <hr className='page__body__aside__hr'/>
            <span className='page__body__aside__sectiontitle'>Your playlists:</span>
            <div className='page__body__aside__playlists'>
              {playlists.map((playlist) => (
                <Link 
                  to={`playlist/${playlist.id}`} 
                  key={playlist.id} 
                  className='page__body__aside__playlists__playlist'
                >{playlist.title}</Link>
              ))}
            </div>
          </aside>
          <main className='page__body__main'>
            <Outlet/>
          </main>     
        </div>
        <LayoutFooter/>
      </MusicProvider>
    </UserProvider>
  );
}
 
export default Layout;
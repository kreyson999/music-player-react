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
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [playlists, setPlaylists] = useState([])
  const currentUser = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  })

  useEffect(() => {
    let mounted = true
    if (currentUser) {
      async function getUserPlaylistsFromDb() {
        const playlistsFromDb = await getUserPlaylists(currentUser.uid)
        if (mounted) {
          setPlaylists(playlistsFromDb)
        }
      }
      getUserPlaylistsFromDb()
    }
    return () => mounted = false
  }, [currentUser])

  // const handleSearchBar = () => {
  //   setIsSearchBarOpen(state => !state)
  // }

  const handleMenu = () => {
    setIsMenuOpen(state => !state)
  }

  return ( 
    <UserProvider>
      <MusicProvider>
        <nav className={`navbar ${isSearchBarOpen ? 'navbar--searchbaropen' : ''}`}>
          <Link to={'/'} className="navbar__logo">
            <img src='assets/logo.svg' alt='LOGO'/>
          </Link>
          {/* <form className="navbar__searchbar">
            <input className='navbar__searchbar__input' placeholder='Search'/>
          </form> */}
          <div className='navbar__buttons'>
            {/* <button 
            onClick={handleSearchBar}
            className='navbar__buttons__iconbutton navbar__buttons__iconbutton--mobile-only'>
              <img src={isSearchBarOpen ? 'assets/close.svg' : 'assets/search.svg'} alt={isSearchBarOpen ? 'Close Menu' : 'Open Search'}/>
            </button> */}
            <button onClick={handleMenu} className='navbar__buttons__iconbutton navbar__buttons__iconbutton--hide navbar__buttons__iconbutton--mobile-only'>
              <img src={isMenuOpen ? 'assets/close.svg' : 'assets/menu.svg'} alt={isSearchBarOpen ? 'Close Menu' : 'Open Menu'}/>
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
              {playlists.map((playlist, index) => (
                <button key={playlist.id} className='page__body__aside__playlists__playlist'>{playlist.title}</button>
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
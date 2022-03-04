import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { logout } from '../../services/auth'
import { useUser } from "../../contexts/UserContext";

import './Navbar.scss'
import { useAuth } from "../../contexts/AuthContext";
import { getUserPlaylists } from "../../services/database";

const Navbar = ({isOpen, onClick}) => {
  const [playlists, setPlaylists] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const user = useUser()
  const userAuth = useAuth()

  useEffect(() => {
    let isMounted = true
    if (user) {
      async function getUserPlaylistsFromDatabase() {
        const playlistsFromDatabase = await getUserPlaylists(userAuth.uid)
        if (isMounted) {
          setPlaylists(playlistsFromDatabase)
          setIsLoading(false)
        }
      }
      getUserPlaylistsFromDatabase()
    }
    return () => isMounted = false
  }, [user, userAuth.uid])

  const handleSignOut = async () => {
    await logout()
  }

  return isLoading ? null : (
    <nav 
    className={`navbar ${isOpen ? 'navbar--open' : ''}`}
    onClick={onClick}
    >
      <div className="navbar__container">
        <div className="navbar__container__links">
          <Link to={"/"} className={"navbar__container__links__link"}>
            <img src="/music-player-react/assets/icons/home.svg" alt="Home" />
          </Link>
        </div>
        <hr />
        <div className="navbar__container__playlists">
          {playlists.map((playlist) => (
            <Link 
            to={`/playlist/${playlist.id}`} 
            key={playlist.id}
            className={"navbar__container__playlists__link"}>
              <img src="/music-player-react/assets/icons/music.svg" alt="Playlist" />
            </Link>
          ))}
        </div>
        <div className="navbar__container__settings">
          <button className="navbar__container__settings__volume">
            <img src="/music-player-react/assets/icons/volume.svg" alt="Change Volume" />
          </button>
          {user.profileUrl && (
            <div onClick={handleSignOut} className="navbar__container__settings__avatar">
              <img src={user.profileUrl} alt="Profile" />
            </div>
          )}
        </div>  
      </div>
    </nav>
  );
}

 
export default Navbar;
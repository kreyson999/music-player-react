import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { logout } from '../../services/auth'
import { useUser } from "../../contexts/UserContext";
import { getUserPlaylists } from "../../services/database";

import { ProgressBar } from '../'
import './Navbar.scss'
import { useMusic } from "../../contexts/MusicContext";

const Navbar = ({isOpen, onClick}) => {
  const [playlists, setPlaylists] = useState([])
  const user = useUser()
  const { currentSong, handleSettingVolume } = useMusic()

  useEffect(() => {
    let isMounted = true
    if (user?.uid) {
      async function getUserPlaylistsFromDatabase() {
        const playlistsFromDatabase = await getUserPlaylists(user.uid)
        if (isMounted) {
          setPlaylists(playlistsFromDatabase)
        }
      }
      getUserPlaylistsFromDatabase()
    }
    return () => isMounted = false
  }, [user])

  const handleSignOut = async () => {
    await logout()
  }

  return (
    <nav 
    className={`navbar ${isOpen ? 'navbar--open' : ''}`}
    onClick={onClick}
    >
      <div className="navbar__container">
        <div className="navbar__container__links">
          <Link to={"/"} onClick={() => user.forceRerender()} className={"navbar__container__links__link"}>
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
              <img src={playlist.photoUrl ? playlist.photoUrl : "/music-player-react/assets/icons/music.svg"} alt="Playlist" />
            </Link>
          ))}
        </div>
        <div className="navbar__container__settings">
          <button className="navbar__container__settings__volume">
            <img src="/music-player-react/assets/icons/volume.svg" alt="Change Volume" />
            <div className="navbar__container__settings__volume__progressbar">
              <ProgressBar
              value={currentSong.volume * 100} 
              maxValue={100} 
              onChange={(e) => handleSettingVolume(e.target.value / 100)}
              />
            </div>
          </button>
          {user?.profileUrl && (
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
import { useEffect, useState } from "react";

import { useAuth } from '../../contexts/AuthContext'
import { useUser } from "../../contexts/UserContext";
import { addSongToPlaylist, createPlaylist, getUserPlaylists } from "../../services/database";

import "./PlaylistModal.scss"

const PlaylistModal = ({ togglePlaylistModal, songId }) => {
  const { uid } = useAuth()
  const { forceRerender } = useUser()
  const [playlists, setPlaylists] = useState([])
  const [shouldUpdate, setShouldUpdate] = useState(true)
  const [canHaveMorePlaylists, setCanHaveMorePlaylists] = useState(false)

  const handleCreatePlaylist = async () => {
    // check if the user has more than 3 playlists
    if (!canHaveMorePlaylists) return
    
    const isCompleted = await createPlaylist(uid)
    // returned value true means that everything went fine and 
    // we should just update user playlists
    if (isCompleted === true) {
      setShouldUpdate(true)
      forceRerender()
    }
  }

  const handleAddSongToPlaylist = async (playlist) => {
    await addSongToPlaylist(playlist, songId)
    setShouldUpdate(true)
  }

  useEffect(() => {
    let isMounted = true
    if (uid && shouldUpdate) {
      async function getUserPlaylistsFromDatabase() {
        const playlistsFromDatabase = await getUserPlaylists(uid)
        if (isMounted) {
          setCanHaveMorePlaylists(playlistsFromDatabase.length < 3)
          setPlaylists(playlistsFromDatabase)
          setShouldUpdate(false)
        }
      }
      getUserPlaylistsFromDatabase()
    }
    return () => isMounted = false
  }, [uid, shouldUpdate])
  
  return (
    <div className="playlistmodal">
      <div className="playlistmodal__container">
        <button className="playlistmodal__container__iconbutton" onClick={togglePlaylistModal}>
          <img src="/music-player-react/assets/icons/close.svg" alt="Close Modal"/>
        </button>
        <button onClick={handleCreatePlaylist} className="playlistmodal__container__newbutton">
          <img src="/music-player-react/assets/icons/plus-circle.svg" alt="Create new playlist"/>
          <span>Create new playlist</span>
        </button>
        <hr className="playlistmodal__container__hr"/>
        <div className="playlistmodal__container__playlists">
          {playlists.map((playlist, index) => {
            const { title, songs } = playlist
            return (
              <div key={index} className="playlistmodal__container__playlists__container">
                <span className="playlistmodal__container__playlists__container__title">{title}</span>
                {songs.includes(songId) ? (
                  <button
                  className="playlistmodal__container__playlists__container__button playlistmodal__container__playlists__container__button--include">
                    <img src="/music-player-react/assets/icons/check.svg" alt="Playlist contain that song"/>
                  </button>
                ) : (
                  <button onClick={() => handleAddSongToPlaylist(playlist)} 
                  className="playlistmodal__container__playlists__container__button">
                    <img src="/music-player-react/assets/icons/plus.svg" alt="Add to playlist"/>
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
 
export default PlaylistModal;
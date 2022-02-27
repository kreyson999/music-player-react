import { useEffect, useState } from "react";

import { useAuth } from '../../../contexts/AuthContext'
import { createPlaylist, getUserPlaylists } from "../../../services/database";

import "./PlaylistModal.scss"

const PlaylistModal = ({togglePlaylistModal}) => {
  const { uid } = useAuth()
  const [playlists, setPlaylists] = useState([])
  const [shouldUpdate, setShouldUpdate] = useState(true)
  const [canCreateMorePlaylists, setCanCreateMorePlaylists] = useState(false)

  const handleCreatePlaylist = async () => {
    if (!canCreateMorePlaylists) return
    const returnedVal = await createPlaylist(uid)
    // returned value true means that everything went fine and 
    // we should just update user playlists
    if (returnedVal === true) {
      // update
      setShouldUpdate(true)
    }
  }

  useEffect(() => {
    let mounted = true
    if (uid && shouldUpdate) {
      async function getUserPlaylistsFromDb() {
        const playlistsFromDb = await getUserPlaylists(uid)
        if (mounted) {
          if (playlistsFromDb.length > 2) {
            setCanCreateMorePlaylists(false)
          } else {
            setCanCreateMorePlaylists(true)
          }
          setPlaylists(playlistsFromDb)
          setShouldUpdate(false)
        }
      }
      getUserPlaylistsFromDb()
    }
    return () => mounted = false
  }, [uid, shouldUpdate])
  
  return (
    <div className="playlistmodal">
      <div className="playlistmodal__container">
        <button className="playlistmodal__container__iconbutton" onClick={togglePlaylistModal}>
          <img src="assets/close.svg" alt="Close Modal"/>
        </button>
        <button onClick={handleCreatePlaylist} className="playlistmodal__container__newbutton">
          <img src="assets/plus-circle.svg" alt="Create new playlist"/>
          <span>Create new playlist</span>
        </button>
        <hr className="playlistmodal__container__hr"/>
        <div className="playlistmodal__container__playlists">
          {playlists.map((playlist, index) => (
            <div key={index} className="playlistmodal__container__playlists__container">
              <span className="playlistmodal__container__playlists__container__title">{playlist.title}</span>
              <button className="playlistmodal__container__playlists__container__button">
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
 
export default PlaylistModal;
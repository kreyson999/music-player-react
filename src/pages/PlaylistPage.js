import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPlaylistById, getPlaylistSongs, getUser } from '../services/database'
import '../styles/PlaylistPage.scss'
import { useMusic } from '../contexts/MusicContext';
import { EditPlaylistModal, Loader, PlayButton, SongInRow } from '../components';
import { useAuth } from '../contexts/AuthContext';

function PlaylistPage() {
  const [playlist, setPlaylist] = useState()
  const [songs, setSongs] = useState([])
  const [author, setAuthor] = useState()
  const [isEditPlaylistModalOpen, setIsEditPlaylistModalOpen] = useState(false)
  const [shouldUpdate, setShouldUpdate] = useState(false)
  const { id } = useParams()
  const { handlePlayThePlaylist, handlePlayThePlaylistWithSong } = useMusic()
  const auth = useAuth()
  
  useEffect(() => {
    let isMounted = true
    if (id || shouldUpdate) {
      async function getPlaylist() {
        const data = await getPlaylistById(id)
        if (isMounted) {
          setPlaylist(data)
        }
      }
      getPlaylist()
    }
    return () => {
      isMounted = false
      setSongs([])
      setPlaylist()
      setAuthor()
    }
  }, [id, shouldUpdate])

  useEffect(() => {
    let isMounted = true
    if (playlist?.createdBy) {
      async function getAuthor() {
        const user = await getUser(playlist.createdBy)
        if (isMounted) {
          setAuthor(user)
        }
      }
      getAuthor()
    }
    return () => isMounted = false
  }, [playlist?.createdBy])

  useEffect(() => {
    let isMounted = true
    if (isMounted && playlist?.songs.length > 0) {
      const getSongs = async () => {
        const result = await getPlaylistSongs(playlist.songs)
        if (isMounted) {
          setSongs(result)
        }
      }
      getSongs()
    }
    return () => isMounted = false
  }, [playlist?.songs])

  useEffect(() => {
    if (shouldUpdate) {
      setShouldUpdate(false)
    } 
  }, [shouldUpdate])

  const handlePlayPlaylist = () => {
    if (!playlist || songs.length === 0) return
    
    const data = {
      ...playlist,
      songs: songs
    }
    
    handlePlayThePlaylist(data)
  }

  const handleToggleEditPlaylistModal = () => {
    if (playlist.createdBy !== auth.uid) return
    if (isEditPlaylistModalOpen) {
      setShouldUpdate(true)
    }
    setIsEditPlaylistModalOpen(state => !state)
  }

  return (playlist ? (
      <div className="playlistpage">
        {isEditPlaylistModalOpen && <EditPlaylistModal toggleEditPlaylistModal={handleToggleEditPlaylistModal} playlist={playlist}/>}
        <h1 className="page__title">Listen to <span>music</span>.</h1>
        <section className='playlistpage__top'>
          <div className="playlistpage__top__image">
            <img src={playlist.photoUrl ? playlist.photoUrl : "/music-player-react/assets/icons/disc.svg"} alt={playlist.title} />
            <div className='playlistpage__top__image__playbutton'>
              <PlayButton handler={handlePlayPlaylist}/>
            </div>
          </div>
          <div className='playlistpage__top__info'>
            <h2 onClick={handleToggleEditPlaylistModal}>{playlist.title}</h2>
            <p>{author ? author.name : ''} | {songs.length} songs</p>
          </div>
        </section>
        <hr />
        <section className='playlistpage__songs'>
          <h2><span>Songs</span> in the playlist:</h2>
          {songs.length === 0 ? (
            <span>This playlist does not currently contain any songs.</span>
          ) : (
            <div className='playlistpage__songs__list'>
              {songs.map((song, index) => (
                <SongInRow 
                index={index + 1}
                song={song} 
                key={song.id} 
                bgLight={true}
                onClick={() => handlePlayThePlaylistWithSong({...playlist, songs: songs}, index)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    ) : <Loader/>)
}

export default PlaylistPage;
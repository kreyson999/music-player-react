import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPlaylistById, getPlaylistSongs, getUser } from '../services/database'
import SongRow from '../components/Queue/SongRow/SongRow'
import '../styles/PlaylistPage.scss'
import { useMusic } from '../contexts/MusicContext';

function PlaylistPage() {
  const [playlist, setPlaylist] = useState()
  const [songs, setSongs] = useState([])
  const [author, setAuthor] = useState()
  const { id } = useParams()
  const { handlePlayThePlaylist } = useMusic()

  const playThePlaylist = () => {
    if (!playlist && songs.length === 0) return
    
    const data = {
      ...playlist,
      songs: songs
    }
    
    handlePlayThePlaylist(data)
  }
  
  useEffect(() => {
    let isMounted = true
    if (id) {
      async function getPlaylist() {
        const data = await getPlaylistById(id)
        if (isMounted) {
          setPlaylist(data)
        }
      }
      getPlaylist()
    }
    return () => isMounted = false
  }, [id])

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

  return (
    <div className="playlistpage">
      {playlist ? (
        <>
          <div className='playlistpage__info'>
            <h1>{playlist.title}</h1>
            <div className='playlistpage__info__details'>
              <div onClick={playThePlaylist} className='playlistpage__info__details__authorimage'>
                <img src={author && author.profileUrl} alt={"Author"}/>
              </div>
              <span>{author && author.name}</span>
              <div className='playlistpage__info__details__circle'></div>
              <span>{playlist.songs.length}</span>
            </div>
          </div>
          <div className='playlistpage__songs'>
            {songs.map((song) => (
              <SongRow key={song.id} song={song}/>
            ))}
          </div>
        </>
      ) : (
        <span>Something went wrong with fetching data!</span>
      )}
    </div>
  );
}

export default PlaylistPage;
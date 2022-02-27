import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPlaylistById, getUser } from '../services/database'
import '../styles/PlaylistPage.scss'

function PlaylistPage() {
  const [playlist, setPlaylist] = useState()
  const [author, setAuthor] = useState()
  const { playlistId } = useParams()
  
  useEffect(() => {
    let mounted = true
    if (playlistId) {
      async function getPlaylist() {
        const data = await getPlaylistById(playlistId)
        if (mounted) {
          setPlaylist(data)
        }
      }
      getPlaylist()
    }
    return () => mounted = false
  }, [playlistId])

  useEffect(() => {
    let mounted = true
    if (playlist?.createdBy) {
      async function getAuthor() {
        const user = await getUser(playlist.createdBy)
        if (mounted) {
          setAuthor(user)
        }
      }
      getAuthor()
    }
    return () => mounted = false
  }, [playlist?.createdBy])

  return (
    <div className="playlistpage">
      {playlist ? (
        <div className='playlistpage__info'>
          <h1>{playlist.title}</h1>
          <div className='playlistpage__info__details'>
            <div className='playlistpage__info__details__authorimage'>
              <img src={author && author.profileUrl} alt={"Author"}/>
            </div>
            <span>{author && author.name}</span>
            <div className='playlistpage__info__details__circle'></div>
            <span>{playlist.songs.length}</span>
          </div>
        </div>
      ) : (
        <span>Something went wrong with fetching data!</span>
      )}
    </div>
  );
}

export default PlaylistPage;
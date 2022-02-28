import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPlaylistById, getUser } from '../services/database'
import '../styles/PlaylistPage.scss'

function PlaylistPage() {
  const [playlist, setPlaylist] = useState()
  const [author, setAuthor] = useState()
  const { id } = useParams()
  
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
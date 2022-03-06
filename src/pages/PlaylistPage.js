import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPlaylistById, getPlaylistSongs, getUser } from '../services/database'
import '../styles/PlaylistPage.scss'
import { useMusic } from '../contexts/MusicContext';
import { Loader, PlayButton, SongInRow } from '../components';

function PlaylistPage() {
  const [playlist, setPlaylist] = useState()
  const [songs, setSongs] = useState([])
  const [author, setAuthor] = useState()
  const { id } = useParams()
  const { handlePlayThePlaylist } = useMusic()

  const handlePlayPlaylist = () => {
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
    return () => {
      isMounted = false
      setSongs([])
      setPlaylist()
      setAuthor()
    }
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
          <h1 className="page__title">Listen to <span>music</span>.</h1>
          <section className='playlistpage__top'>
            <div className="playlistpage__top__image">
              <img src="/music-player-react/assets/icons/disc.svg" alt={playlist.title} />
              <div className='playlistpage__top__image__playbutton'>
                <PlayButton handler={handlePlayPlaylist}/>
              </div>
            </div>
            <div className='playlistpage__top__info'>
              <h2>{playlist.title}</h2>
              <p>{author ? author.name : ''} | {songs.length} songs</p>
            </div>
          </section>
          <hr />
          <section className='playlistpage__songs'>
            <h2><span>Songs</span> in playlist:</h2>
            {songs.length === 0 ? (
              <span>This playlist does not currently contain any songs.</span>
            ) : (
              <div className='playlistpage__songs__list'>
                {songs.map((song) => (
                  <SongInRow song={song} key={song.id} bgLight={true}/>
                ))}
              </div>
            )}
          </section>
        </>
      ) : (
        <Loader/>
      )}
    </div>
    // <div className="playlistpage">
    //   {playlist ? (
    //     <>
    //       <div className='playlistpage__info'>
    //         <h1>{playlist.title}</h1>
    //         <div className='playlistpage__info__details'>
    //           <div onClick={playThePlaylist} className='playlistpage__info__details__authorimage'>
    //             <img src={author && author.profileUrl} alt={"Author"}/>
    //           </div>
    //           <span>{author && author.name}</span>
    //           <div className='playlistpage__info__details__circle'></div>
    //           <span>{playlist.songs.length}</span>
    //         </div>
    //       </div>
    //       <div className='playlistpage__songs'>
    //         {/* {songs.map((song) => (
    //           <SongRow key={song.id} song={song}/>
    //         ))} */}
    //       </div>
    //     </>
    //   ) : (
    //     <span>Something went wrong with fetching data!</span>
    //   )}
    // </div>
  );
}

export default PlaylistPage;
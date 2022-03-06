import { useMusic } from '../../contexts/MusicContext'

import { PlayButton } from '..';

import './PlaylistContainer.scss'
import { useEffect, useState } from 'react';
import { getPlaylistSongs } from '../../services/database';
import { Link } from 'react-router-dom';

const PlaylistContainer = ({playlist}) => {
  const { photoUrl, title } = playlist
  const { handlePlayThePlaylist } = useMusic()
  const [songs, setSongs] = useState([])


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

  const handlePlayPlaylist = () => {
    if (!playlist && songs.length === 0) return
    
    const data = {
      ...playlist,
      songs: songs
    }
    
    handlePlayThePlaylist(data)
  }

  return (
    <div className="playlistcontainer">
      <div className="playlistcontainer__image">
        <img src={photoUrl ? photoUrl : '/music-player-react/assets/icons/headphones.svg'} alt={title} />
        <div className="playlistcontainer__image__playbutton">
          <PlayButton handler={handlePlayPlaylist}/>  
        </div>
      </div>
      <Link to={`/playlist/${playlist.id}`}  className="playlistcontainer__bottom">
        <div className="playlistcontainer__bottom__info">
          <h3>{title}</h3>
          <span>{songs.length} songs</span>  
        </div>
      </Link>
    </div>
  );
}
 
export default PlaylistContainer;
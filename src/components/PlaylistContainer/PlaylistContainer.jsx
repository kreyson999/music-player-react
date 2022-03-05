// import { useRef } from 'react';

// import { useModal } from '../../contexts/SongModalContext';
import { useMusic } from '../../contexts/MusicContext'

import { PlayButton } from '..';

import './PlaylistContainer.scss'
import { useEffect, useState } from 'react';
import { getPlaylistSongs } from '../../services/database';

const PlaylistContainer = ({playlist}) => {
  // const playlistRef = useRef()
  const { photoUrl, title } = playlist
  const { handlePlayThePlaylist } = useMusic()
  const [songs, setSongs] = useState([])
  // const { togglePlaylistModal, showModal } = useModal()

  // const handleShowModal = () => {
  //   const { x, y, height, width } = songRef.current.getBoundingClientRect()
  //   const children = (
  //     <>
  //       <button onClick={() => togglePlaylistModal()}>Dodaj do playlisty</button>
  //       <button onClick={() => handleAddingSongToQueue(song)}>Dodaj do kolejki</button>
  //     </>
  //   )
  //   showModal(
  //     {
  //       modalChildren: children, 
  //       pos: {
  //         x: x+(width/2), 
  //         y: y+(height/1.25)
  //       }, 
  //       songId: song.id
  //     })
  // }

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
      <div className="playlistcontainer__bottom">
        <div className="playlistcontainer__bottom__info">
          <h3>{title}</h3>
          <span>{songs.length} songs</span>  
        </div>
        <button className='playlistcontainer__bottom__button'>
          <img src="/music-player-react/assets/icons/more-vertical.svg" alt="More" />
        </button>
      </div>
    </div>
  );
}
 
export default PlaylistContainer;
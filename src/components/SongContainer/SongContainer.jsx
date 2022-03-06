import { useRef } from 'react';

import { useModal } from '../../contexts/SongModalContext';
import { useMusic } from '../../contexts/MusicContext'

import { PlayButton } from '../';

import './SongContainer.scss'

const SongContainer = ({song, bgLight=false}) => {
  const songRef = useRef()
  const { photoUrl, title, artists } = song
  const { handleChangingSong, handleAddingSongToQueue } = useMusic()
  const { togglePlaylistModal, showModal } = useModal()

  const handleShowModal = () => {
    const { x, y, height, width } = songRef.current.getBoundingClientRect()
    const children = (
      <>
        <button onClick={() => togglePlaylistModal()}>Dodaj do playlisty</button>
        <button onClick={() => handleAddingSongToQueue(song)}>Dodaj do kolejki</button>
      </>
    )
    showModal(
      {
        modalChildren: children, 
        pos: {
          x: x+(width/2), 
          y: y+(height/1.25)
        }, 
        songId: song.id
      })
  }

  const handlePlaySong = () => {
    handleChangingSong(song)
  }

  return (
    <div ref={songRef} className={`songcontainer ${bgLight ? 'songcontainer--bglight' : ''}`}>
      <div className="songcontainer__image">
        <img src={photoUrl} alt={title} />
        <div className="songcontainer__image__playbutton">
          <PlayButton handler={handlePlaySong}/>  
        </div>
      </div>
      <div className="songcontainer__bottom">
        <div className="songcontainer__bottom__info">
          <h3>{title}</h3>
          <span>{artists[0]}</span>  
        </div>
        <button onClick={handleShowModal} className='songcontainer__bottom__button'>
          <img src="/music-player-react/assets/icons/more-vertical.svg" alt="More" />
        </button>
      </div>
    </div>
  );
}
 
export default SongContainer;
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../../../contexts/MenuModalContext';
import { useMusic } from '../../../contexts/MusicContext';
import './Song.scss'

const Song = ({song}) => {
  const { handleAddingSongToQueue, handleChangingSong } = useMusic()
  const { togglePlaylistModal, showModal } = useModal()
  const songRef = useRef()
  
  const handleShowModal = () => {
    const { x, y, height, width } = songRef.current.getBoundingClientRect()
    const children = (
      <>
        <button onClick={() => togglePlaylistModal()}>Dodaj do playlisty</button>
        <button onClick={() => handleAddingSongToQueue(song)}>Dodaj do kolejki</button>
      </>
    )
    showModal({modalChildren: children, pos: {x: x+(width/2), y: y+(height/1.25)}, songId: song.id})
  }

  const { artists, title, photoUrl } = song

  return (
    <div ref={songRef} className="song">
      <div className="song__image">
        <img src={photoUrl} alt={`${title}`}/>
        <div onClick={() => handleChangingSong(song)} className='song__image__hover'>
          <img src='assets/play-circle.svg' alt='Play This Music'/>
          <span>Play</span>
        </div>
      </div>
      <div className='song__bottom'>
        <Link to={'/'} className="song__bottom__title">{artists[0]} - {title}</Link>
        <button 
          onClick={handleShowModal} 
          className='song__bottom__iconbutton'>
          <img src='assets/more-vertical.svg' alt='Click to see more'/>
        </button>
      </div>
    </div>
  );
}
 
export default Song;
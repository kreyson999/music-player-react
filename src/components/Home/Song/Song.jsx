import { useRef } from 'react';
import { useModal } from '../../../contexts/MenuModalContext';
import { useMusic } from '../../../contexts/MusicContext';
import './Song.scss'

const Song = ({song}) => {
  const music = useMusic()
  const modal = useModal()
  const songRef = useRef()
  
  const showModal = () => {
    const { x, y, height, width } = songRef.current.getBoundingClientRect()
    const children = (
      <>
        <button onClick={() => modal.togglePlaylistModal()}>Dodaj do playlisty</button>
        <button onClick={() => music.handleAddToQueue(song)}>Dodaj do kolejki</button>
      </>
    )
    modal.showModal(children, {x: x+(width/2), y: y+(height/1.25)})
  }

  return (
    <div ref={songRef} className="song">
      <div className="song__image">
        <img src={song.photoUrl} alt={`${song.title}`}/>
        <div onClick={() => music.handleChangingMusic(song)} className='song__image__hover'>
          <img src='assets/play-circle.svg' alt='Play This Music'/>
          <span>Play</span>
        </div>
      </div>
      <div className='song__bottom'>
        <a href="/" className="song__bottom__title">{song.artists[0]} - {song.title}</a>
        <button 
        onClick={showModal} 
        className='song__bottom__iconbutton'>
          <img src='assets/more-vertical.svg' alt='Click to see more'/>
        </button>
      </div>
    </div>
  );
}
 
export default Song;
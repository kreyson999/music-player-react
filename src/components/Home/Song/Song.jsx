import { useMusic } from '../../../contexts/MusicContext';
import './Song.scss'

const Song = ({song}) => {
  const music = useMusic()
  
  return (
    <div className="song">
      <div className="song__image">
        <img src={song.photoUrl} alt={`${song.title}`}/>
        <div onClick={() => music.change(song)} className='song__image__hover'>
          <img src='assets/play-circle.svg' alt='Play This Music'/>
          <span>Play</span>
        </div>
      </div>
      <a href="/" className="song__title">{song.title}</a>
    </div>
  );
}
 
export default Song;
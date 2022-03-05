import { PlayButton } from '../';
import { useMusic } from '../../contexts/MusicContext';

import './MobileCurrentSong.scss'

const MobileCurrentSong = ({onClick}) => {
  const { currentSong, handlePlayingStatus, isPlaying } = useMusic() 

  return currentSong.duration > 0 && (
    <div className="currentsong">
      <div className="currentsong__image" onClick={onClick}>
        <img src={currentSong.photoUrl} alt={currentSong.title} />
      </div>
      <div className="currentsong__info" onClick={onClick}>
        <h2>{currentSong.title}</h2>
        <span>{currentSong.artists.join(', ')}</span>
      </div>
      <PlayButton isPlaying={isPlaying} handler={handlePlayingStatus}/>
    </div>
  );
}
 
export default MobileCurrentSong;
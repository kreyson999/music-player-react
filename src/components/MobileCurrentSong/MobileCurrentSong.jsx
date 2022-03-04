import { PlayButton } from '../';
import { useMusic } from '../../contexts/MusicContext';

import './MobileCurrentSong.scss'

const MobileCurrentSong = () => {
  const { currentSong, handlePlayingStatus, isPlaying } = useMusic() 

  return currentSong.duration > 0 && (
    <div className="currentsong">
      <div className="currentsong__image">
        <img src={currentSong.photoUrl} alt={currentSong.title} />
      </div>
      <div className="currentsong__info">
        <h2>{currentSong.title}</h2>
        <span>{currentSong.artists.join(', ')}</span>
      </div>
      <PlayButton isPlaying={isPlaying} handler={handlePlayingStatus}/>
    </div>
  );
}
 
export default MobileCurrentSong;
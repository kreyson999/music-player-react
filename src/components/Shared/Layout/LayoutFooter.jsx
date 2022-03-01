import { Link } from "react-router-dom";
import { useMusic } from "../../../contexts/MusicContext";
import ProgressBar from "../ProgressBar/ProgressBar";
 

const LayoutFooter = () => {
  const { currentSong, handlePlayingStatus, isPlaying, handleSkipToTheNextSong, 
    handleSkipToThePreviousSong, handleSettingSongCurrentTime, handleSettingVolume } = useMusic()

  return currentSong === undefined ? null : (
    <footer className='footer'>
      <div className="footer__songinfo">
        <div className="footer__songinfo__image">
          <img src={currentSong.photoUrl} alt={currentSong.title}/>
        </div>
        <div className="footer__songinfo__info footer__songinfo__info--desktop-only">
          <h3>{currentSong.title}</h3>
          <span className="footer__songinfo__info__artists">
            {currentSong?.artists !== undefined ? currentSong.artists.join(', '): null}
          </span>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="footer__bottom__buttons">
          <button onClick={handleSkipToThePreviousSong} className='footer__bottom__buttons__iconbutton footer__bottom__buttons__previous'>
            <img src='/assets/left_icon.svg' alt='Left Icon'/>
          </button>
          <button onClick={handlePlayingStatus} 
          className='footer__bottom__buttons__iconbutton footer__bottom__buttons__play'>
            {isPlaying ? <img src='/assets/pause-circle.svg' alt='Pause Icon'/> : <img src='/assets/play-circle.svg' alt='Play Icon'/>}
          </button>
          <button onClick={handleSkipToTheNextSong} className='footer__bottom__buttons__iconbutton footer__bottom__buttons__next'>
            <img src='/assets/right_icon.svg' alt='Right Icon'/>
          </button>
        </div>
        <div className="footer__bottom__timeline">
          <ProgressBar 
            value={currentSong.currentTime} 
            maxValue={currentSong.duration} 
            onChange={(e) => handleSettingSongCurrentTime(e.target.value)}
            withValues={true}
          />
        </div>
      </div>
      <div className="footer__right">
        <Link to={"/queue"} className="footer__right__iconbutton">
          <img src='/assets/list.svg' alt='Queue'/>
        </Link>
        <div className="footer__right__volumebar">
          <ProgressBar 
            value={currentSong.volume * 100} 
            maxValue={100} 
            onChange={(e) => handleSettingVolume(e.target.value / 100)}
          />
        </div>
      </div>
    </footer>
  );
}
 
export default LayoutFooter;
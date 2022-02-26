import { useMusic } from "../../../contexts/MusicContext";
import ProgressBar from "./ProgressBar";
import VolumeBar from "./VolumeBar";
 

const LayoutFooter = () => {
  const { currentMusic, handleStatus, isPlaying } = useMusic()

  return currentMusic === undefined ? null : (
    <footer className='footer'>
      <div className="footer__songinfo">
        <div className="footer__songinfo__image">
          <img src={currentMusic.photoUrl} alt={currentMusic.title}/>
        </div>
        <div className="footer__songinfo__info footer__songinfo__info--desktop-only">
          <h3>{currentMusic.title}</h3>
          <span className="footer__songinfo__info__artists">
            {currentMusic?.artists !== undefined ? currentMusic.artists.join(', '): null}
          </span>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="footer__bottom__buttons">
          <button className='footer__bottom__buttons__iconbutton footer__bottom__buttons__previous'>
            <img src='assets/left_icon.svg' alt='Left Icon'/>
          </button>
          <button onClick={handleStatus} 
          className='footer__bottom__buttons__iconbutton footer__bottom__buttons__play'>
            {isPlaying ? <img src='assets/pause-circle.svg' alt='Pause Icon'/> : <img src='assets/play-circle.svg' alt='Play Icon'/>}
          </button>
          <button className='footer__bottom__buttons__iconbutton footer__bottom__buttons__next'>
            <img src='assets/right_icon.svg' alt='Left Icon'/>
          </button>
        </div>
        <ProgressBar/>
      </div>
      <div className="footer__right">
        <button className="footer__right__iconbutton">
          <img src='assets/list.svg' alt='Queue'/>
        </button>
        <VolumeBar/>
      </div>
    </footer>
  );
}
 
export default LayoutFooter;
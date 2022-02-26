import { useEffect, useRef, useState } from "react";
import { useMusic } from "../../../contexts/MusicContext";

const VolumeBar = () => {
  const [currentVolume, setCurrentVolume] = useState(0.5)
  const progressRef = useRef()
  const music = useMusic()

  useEffect(() => {
    const setProgressWidth = () => {
      let target = progressRef.current
      const min = target.min
      const max = target.max
      const val = target.value

      target.style.backgroundSize = (val - min) * 100 / (max - min) + "% 100%"
    }
    if (progressRef) {
      setProgressWidth()
    }
  }, [currentVolume])

  useEffect(() => {
    music.handleSettingVolume(currentVolume)
  }, [music.currentMusic, music, currentVolume])

  const handleChangingVolume = (e) => {
    setCurrentVolume(e.target.value / 100)
  }
  

  return (
    <div className='footer__right__volumebar footer__right__volumebar--desktop-only'>
      <button className="footer__right__iconbutton footer__right__iconbutton--desktop-only">
        <img src='assets/volume.svg' alt='Volume'/>
      </button>
      <input 
      ref={progressRef}
        type="range" 
        min={0} 
        max={100} 
        value={currentVolume * 100} 
        onChange={handleChangingVolume} 
        className="footer__bottom__timeline__progressbar"
      />
    </div>
  );
}
 
export default VolumeBar;
import { useEffect, useRef, useState } from "react";
import { useMusic } from "../../../contexts/MusicContext";
import { getFormattedTime } from "../../../helpers/getFormattedTime";

const ProgressBar = () => {
  const progressRef = useRef()
  const music = useMusic()
  const [musicDuration, setMusicDuration] = useState(0)

  useEffect(() => {
    setMusicDuration(music.currentMusic.duration)
  }, [music.currentMusic.duration])

  useEffect(() => {
    const setProgressWidth = () => {
      if (music.currentMusic.duration === 0) return 
      let target = progressRef.current
      const min = target.min
      const max = target.max
      const val = target.value

      target.style.backgroundSize = (val - min) * 100 / (max - min) + "% 100%"
    }
    if (progressRef) {
      setProgressWidth()
    }
  }, [music.currentMusic])

  return (
    <div className='footer__bottom__timeline'>
      <span>{getFormattedTime(music.currentMusic.currentTime)}</span>
      <input 
      ref={progressRef}
        type="range" 
        min={0} 
        max={musicDuration} 
        value={music.currentMusic.currentTime} 
        onChange={(e) => music.handleSettingCurrentTime(e.target.value)} 
        className="footer__bottom__timeline__progressbar"
      />
      <span>{getFormattedTime(music.currentMusic.duration)}</span>
    </div>
  );
}
 
export default ProgressBar;
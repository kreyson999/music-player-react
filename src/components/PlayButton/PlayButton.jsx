import { useEffect, useState } from 'react';
import './PlayButton.scss'

const PlayButton = ({handler, isPlaying = false}) => {
  const [state, setState] = useState(false)

  // const handleOnClick = () => {
  //   setState(state => !state)
  // }

  useEffect(() => {
    setState(isPlaying)
  }, [isPlaying])

  return (
    <div className="playbutton" onClick={handler}>
      <img 
        src={state ? "/music-player-react/assets/icons/pause.svg" : "/music-player-react/assets/icons/play.svg"} 
        alt={state ? "Pause" : "Play"}
      />
    </div>
  );
}
 
export default PlayButton;
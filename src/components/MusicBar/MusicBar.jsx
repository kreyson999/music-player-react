import { useMusic } from "../../contexts/MusicContext";

import './MusicBar.scss'

const MusicBar = () => {
  
  const { currentSong } = useMusic()

  return (
    <aside className="musicbar">
      <div className="musicbar__current">
        <h2><span>Now</span> playing</h2>
        {currentSong.duration > 0 && (
          <div className="musicbar__current__info">
            <div className="musicbar__current__info__image">
              <img src={currentSong.photoUrl} alt={currentSong.title} />
            </div>
            <h1>{currentSong.title}</h1>
            <span>{currentSong.artists.join(', ')}</span>
          </div>
        )}
        <div className="musicbar__current__controls">

        </div>
      </div>
      <hr />
      <div className="musicbar__queue">

      </div>
    </aside>
  );
}
 
export default MusicBar;
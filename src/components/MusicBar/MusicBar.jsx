import { useMusic } from "../../contexts/MusicContext";
import { PlayButton, ProgressBar, SongInRow } from "../";

import './MusicBar.scss'

const MusicBar = ({isMusicBarOpen, handleToggleMusicBar}) => {
  
  const { currentSong, queue, handleSettingSongCurrentTime, handlePlayingStatus, isPlaying } = useMusic()

  return currentSong.duration > 0 && (
    <aside className={`musicbar ${isMusicBarOpen ? 'musicbar--open' : ''}`}>
      <button onClick={handleToggleMusicBar} className="musicbar__closebutton">
        <img src="/music-player-react/assets/icons/close.svg" alt="Close Musicbar" />
      </button>
      <div className="musicbar__current">
        <h2 className="musicbar__sectiontitle"><span>Now</span> playing</h2>
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
          <div className="musicbar__current__controls__buttons">
            <button className="musicbar__current__controls__buttons__iconbutton">
              <img src="/music-player-react/assets/icons/skip-back.svg" alt="Skip back" />
            </button>
            <PlayButton handler={handlePlayingStatus} isPlaying={isPlaying}/>
            <button className="musicbar__current__controls__buttons__iconbutton">
              <img src="/music-player-react/assets/icons/skip-forward.svg" alt="Skip forward" />
            </button>
          </div>
          <div className="musicbar__current__progressbar">
            <ProgressBar
              withValues={true}
              value={currentSong.currentTime}
              maxValue={currentSong.duration}
              onChange={(e) => handleSettingSongCurrentTime(e.target.value)}
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="musicbar__queue">
        <h2 className="musicbar__sectiontitle"><span>Your</span> queue</h2>
        {queue.length > 0 ? 
          queue.map((song) => (
            <SongInRow song={song}/>
          )
        ) : (
          <span>The Queue is currently empty.</span>
        )}
      </div>
    </aside>
  );
}
 
export default MusicBar;
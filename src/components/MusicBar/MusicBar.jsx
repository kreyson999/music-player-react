import { useMusic } from "../../contexts/MusicContext";
import { PlayButton, ProgressBar, SongInRow } from "../";

import './MusicBar.scss'

const MusicBar = ({isMusicBarOpen, onClick}) => {
  
  const { currentSong, queue, handleSettingSongCurrentTime, handlePlayingStatus, 
    isPlaying, handleSkipToTheNextSong, handleSkipToThePreviousSong, currentPlaylist } = useMusic()

  return (
    <aside className={`musicbar ${isMusicBarOpen ? 'musicbar--open' : ''}`}>
      <button onClick={onClick} className="musicbar__closebutton">
        <img src="/music-player-react/assets/icons/close.svg" alt="Close Musicbar" />
      </button>
      {currentSong.duration > 0 && (
        <>
          <div className="musicbar__current">
            <h2 className="musicbar__sectiontitle"><span>Now</span> playing</h2>
            <div className="musicbar__current__info">
              <div className="musicbar__current__info__image">
                <img src={currentSong.photoUrl} alt={currentSong.title} />
              </div>
              <h1>{currentSong.title}</h1>
              <span>{currentSong.artists.join(', ')}</span>
            </div>
            <div className="musicbar__current__controls">
              <div className="musicbar__current__controls__buttons">
                <button 
                onClick={handleSkipToThePreviousSong}
                className="musicbar__current__controls__buttons__iconbutton">
                  <img src="/music-player-react/assets/icons/skip-back.svg" alt="Skip back" />
                </button>
                <PlayButton handler={handlePlayingStatus} isPlaying={isPlaying}/>
                <button 
                onClick={handleSkipToTheNextSong}
                className="musicbar__current__controls__buttons__iconbutton">
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
        </>
      )}
      {(queue.length > 0 || !currentPlaylist) && (
        <div className="musicbar__queue">
          <h2 className="musicbar__sectiontitle"><span>Your</span> queue</h2>
          {queue.length > 0 ? 
            queue.map((song) => (
              <SongInRow song={song} key={song.id}/>
            )
          ) : (
            <span className="musicbar__queue__emptymessage">The Queue is currently empty.</span>
          )}
        </div>
      )}
      {currentPlaylist && (
        <div className="musicbar__playlist">
          <h2 className="musicbar__sectiontitle">Next from <span>{currentPlaylist.title}</span></h2>
          {currentPlaylist.songs.map((song) => (
            <SongInRow song={song} key={song.id}/>
          ))}
        </div>
      )}
    </aside>
  );
}
 
export default MusicBar;
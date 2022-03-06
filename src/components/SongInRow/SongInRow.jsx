import './SongInRow.scss'

const SongInRow = ({song, bgLight=false}) => {

  const { photoUrl, title, artists } = song

  return (
    <div className={`songinrow ${bgLight ? 'songinrow--bglight' : ''}`}>
      <div className="songinrow__image">
        <img src={photoUrl} alt={title} />
      </div>
      <div className="songinrow__info">
        <span className="songinrow__info__title">{title}</span>
        <span className="songinrow__info__artists">{artists.join(', ')}</span>
      </div>
      <button className='songinrow__playbutton'>
        <img src="/music-player-react/assets/icons/play.svg" alt="Play this music" />
      </button>
    </div>
  );
}
 
export default SongInRow;
import './SongInRow.scss'

const SongInRow = ({song, bgLight=false, onClick, index = 0}) => {

  const { photoUrl, title, artists } = song

  return (
    <div className={`songinrow ${bgLight ? 'songinrow--bglight' : ''}`}>
      <div className="songinrow__image">
        <img src={photoUrl} alt={title} />
      </div>
      <div className="songinrow__info">
        <h4 className="songinrow__info__title">{title}</h4>
        <span className="songinrow__info__artists">{artists.join(', ')}</span>
      </div>
      <button onClick={onClick} className='songinrow__playbutton'>
        <img src="/music-player-react/assets/icons/play.svg" alt="Play this music" />
      </button>
      <span className='songinrow__index'>{index}</span>
    </div>
  );
}
 
export default SongInRow;
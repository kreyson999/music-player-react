import './SongInRow.scss'

const SongInRow = ({song}) => {

  const { photoUrl, title, artists } = song

  return (
    <div className="song">
      <div className="song__image">
        <img src={photoUrl} alt={title} />
      </div>
      <div className="song__info">
        <span className="song__info__title">{title}</span>
        <span className="song__info__artists">{artists.join(', ')}</span>
      </div>
      <button>
        <img src="/music-player-react/assets/icons/play.svg" alt="Play this music" />
      </button>
    </div>
  );
}
 
export default SongInRow;
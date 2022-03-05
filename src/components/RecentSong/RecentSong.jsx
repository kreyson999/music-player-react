import { PlayButton } from '..'
import './RecentSong.scss'

const RecentSong = ({song}) => {
  const { photoUrl, title, artists } = song

  return (
    <div className="recentsong">
      <div className="recentsong__image">
        <img src={photoUrl} alt={title} />
      </div>
      <div className="recentsong__info">
        <span className='recentsong__info__title'>{title}</span>
        <span className='recentsong__info__artist'>{artists[0]}</span>
      </div>
      <PlayButton/>
    </div>
  );
}
 
export default RecentSong;
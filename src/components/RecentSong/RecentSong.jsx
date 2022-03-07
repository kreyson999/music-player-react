import { PlayButton } from '..'
import './RecentSong.scss'

const RecentSong = ({song}) => {
  const { photoUrl, title } = song

  return (
    <div className="recentsong">
      <div className="recentsong__image">
        <img src={photoUrl} alt={title} />
      </div>
      <div className="recentsong__info">
        <span className='recentsong__info__title'>{title}</span>
      </div>
      <PlayButton/>
    </div>
  );
}
 
export default RecentSong;
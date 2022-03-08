import { useMusic } from '../../contexts/MusicContext'

import { PlayButton } from '..'
import './RecentSong.scss'

const RecentSong = ({song}) => {
  const { photoUrl, title } = song
  const { handleChangingSong } = useMusic()

  return (
    <div className="recentsong">
      <div className="recentsong__image">
        <img src={photoUrl} alt={title} />
      </div>
      <div className="recentsong__info">
        <span className='recentsong__info__title'>{title}</span>
      </div>
      <PlayButton handler={() => handleChangingSong(song)}/>
    </div>
  );
}
 
export default RecentSong;
import { useMusic } from '../contexts/MusicContext'

import SongRow from '../components/Queue/SongRow/SongRow';
import SectionTitle from '../components/Shared/SectionTitle/SectionTitle';

import '../styles/QueuePage.scss'

function QueuePage() {
  const music = useMusic()

  return (
    <div className="queuepage">
      <SectionTitle title={"Queue"}/>
      {music.currentMusic.duration > 0 ? (
        <>
          <div className='queuepage__container'>
            <span className='queuepage__container__title'>Currently Playing:</span>
            <SongRow index={1} song={music.currentMusic}/>
          </div>
        </>
      ) : null}
      <div className='queuepage__container'>
        {music.queue.length > 0 ? (
          <>
            <span className='queuepage__container__title'>Upcoming:</span>
            {music.queue.map((song, index) => {
              return <SongRow index={index + (music.currentMusic.duration > 0 ? 2 : 1)} song={song}/>
            })}
          </>
        ) : (
          <span className='queuepage__container__title'>The queue is currently empty!</span>
        )}
      </div>
    </div>
  );
}

export default QueuePage;
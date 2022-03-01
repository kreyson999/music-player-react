import { useMusic } from '../contexts/MusicContext'

import SongRow from '../components/Queue/SongRow/SongRow';
import SectionTitle from '../components/Shared/SectionTitle/SectionTitle';

import '../styles/QueuePage.scss'

function QueuePage() {
  const { currentSong, queue, currentPlaylist } = useMusic()

  return (
    <div className="queuepage">
      <SectionTitle title={"Queue"}/>
      {currentSong.duration > 0 ? (
        <>
          <div className='queuepage__container'>
            <span className='queuepage__container__title'>Currently Playing:</span>
            <SongRow index={1} song={currentSong}/>
          </div>
        </>
      ) : null}
      <div className='queuepage__container'>
        {queue.length > 0 && (
          <>
            <span className='queuepage__container__title'>Upcoming:</span>
            {queue.map((song, index) => (
              <SongRow 
                key={index} 
                index={index + (currentSong.duration > 0 ? 2 : 1)} 
                song={song}
              />
            ))}
          </>
        )}
      </div>
      <div className='queuepage__container'>
        {currentPlaylist && (
          <>
            <span className='queuepage__container__title'>Next from {currentPlaylist.title}:</span>
            {currentPlaylist.songs.map((song, index) => (
              <SongRow 
                key={index} 
                index={index + (currentSong.duration > 0 ? (2 + queue.length) : (1 + queue.length))} 
                song={song}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default QueuePage;
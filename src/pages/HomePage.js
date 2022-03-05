import { useEffect, useState } from "react";

import { getSongs, getUserPlaylists } from "../services/database";

import { Carousel, RecentSong, SongContainer, PlaylistContainer } from "../components";
import '../styles/HomePage.scss'
import { useAuth } from "../contexts/AuthContext";

function HomePage() {
  const userAuth = useAuth()
  const [songs, setSongs] = useState([])
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    let isMounted = true
    if (userAuth.uid) {
      async function getData() {
        const songs = await getSongs()
        const playlists = await getUserPlaylists(userAuth.uid)
        if (isMounted) {
          setSongs(songs)
          setPlaylists(playlists)
        }
      }
      getData()
    }
    return () => isMounted = false
  }, [userAuth.uid])

  return (
    <div className="homepage">
      <h1 className="page__title">Listen to <span>music</span>.</h1>
      <section className="homepage__recentsongs">
        {songs.map((song) => (
          <RecentSong song={song} key={song.id}/>
        ))}
      </section>
      <section className="homepage__recentlyaddedsongs">
        <h2 className="homepage__sectiontitle"><span>Recently</span> added songs</h2>
        <Carousel>
          {songs.map((song) => (
            <SongContainer key={song.id} song={song}/>
          ))}
        </Carousel>
      </section>
      <section className="homepage__recentlyaddedsongs">
        <h2 className="homepage__sectiontitle"><span>Your</span> playlists:</h2>
        <Carousel>
          {playlists.map((playlist) => (
            <PlaylistContainer key={playlist.id} playlist={playlist}/>
          ))}
        </Carousel>
      </section>
    </div>
  );
}

export default HomePage;
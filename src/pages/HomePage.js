import { useEffect, useState } from "react";

import RecentSong from "../components/RecentSong/RecentSong";
import MenuModalProvider from "../contexts/MenuModalContext";
import { getSongs } from "../services/database";
import '../styles/HomePage.scss'

function HomePage() {
  const [songs, setSongs] = useState([])

  useEffect(() => {
    let isMounted = true
    async function getSongsFromDatabase() {
      const data = await getSongs()
      if (isMounted) {
        setSongs(data)
      }
    }
    getSongsFromDatabase()
    return () => isMounted = false
  }, [])

  return (
    <div className="homepage">
      <h1 className="page__title">Listen to <span>music</span>.</h1>
      <MenuModalProvider>
        <section className="homepage__recentsongs">
          {songs.map((song) => (
            <RecentSong song={song} key={song.id}/>
          ))}
        </section>
        <section className="homepage__recentlyaddedsongs">

        </section>
      </MenuModalProvider>
    </div>
  );
}

export default HomePage;
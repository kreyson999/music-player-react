import { useEffect, useState } from "react";

import Song from "../components/Home/Song/Song";
import MenuModalProvider from "../contexts/MenuModalContext";
import { getSongs } from "../services/database";
import '../styles/HomePage.scss'

function HomePage() {
  const [songs, setSongs] = useState([])

  useEffect(() => {
    let mounted = true
    async function getSongsFromDb() {
      const data = await getSongs()
      if (mounted) {
        setSongs(data)
      }
    }
    getSongsFromDb()
    return () => mounted = false
  }, [])

  return (
    <div className="homepage">
      <MenuModalProvider>
        <section>
          <h2 className="homepage__sectiontitle">All songs</h2>
          <div className="homepage__carousel">
            {songs.map((song) => (
              <Song key={song.id} song={song}/>
            ))}
          </div>
        </section>
      </MenuModalProvider>
    </div>
  );
}

export default HomePage;
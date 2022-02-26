import { useEffect, useState } from "react";

import Song from "../components/Home/Song/Song";
import SectionTitle from "../components/Shared/SectionTitle/SectionTitle";
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
          <SectionTitle title={"All songs"}/>
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
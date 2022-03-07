import { useEffect, useState } from "react";

import { getPlaylists, getSongs, getUserPlaylists } from "../services/database";

import { Carousel, RecentSong, SongContainer, PlaylistContainer, Loader } from "../components";
import '../styles/HomePage.scss'
import { useAuth } from "../contexts/AuthContext";

function HomePage() {
  const userAuth = useAuth()
  const [recentSongs, setRecentSongs] = useState([])
  const [songs, setSongs] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [usersPlaylists, setUsersPlaylists] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    if (userAuth?.uid) {
      async function getData() {
        const recentSongs = JSON.parse(window.localStorage.getItem('recentsongs'))
        const songs = await getSongs()
        const playlists = await getUserPlaylists(userAuth.uid)
        const usersPlaylists = await getPlaylists()
        if (isMounted) {
          setRecentSongs(state => recentSongs ? recentSongs : [])
          setSongs(songs)
          setPlaylists(playlists)
          setUsersPlaylists(usersPlaylists)
          setIsLoading(false)
        }
      }
      getData()
    }
    return () => isMounted = false
  }, [userAuth?.uid])

  return (
    <div className="homepage">
      <h1 className="page__title">Listen to <span>music</span>.</h1>
      {isLoading ? <Loader/> : (
        <>
          {recentSongs.length > 0 && (
            <section className="homepage__recentsongs">
              {recentSongs.map((song, index) => (
                <RecentSong song={song} key={index}/>
              ))}
            </section>
          )}
          <section className="homepage__recentlyaddedsongs">
            <h2 className="homepage__sectiontitle"><span>Recently</span> added songs</h2>
            <Carousel>
              {songs.map((song) => (
                <SongContainer key={song.id} song={song}/>
              ))}
            </Carousel>
          </section>
          {playlists.length > 0 && (
            <section className="homepage__playlists">
              <h2 className="homepage__sectiontitle"><span>Your</span> playlists:</h2>
              <Carousel>
                {playlists.map((playlist) => (
                  <PlaylistContainer key={playlist.id} playlist={playlist}/>
                ))}
              </Carousel>
            </section>
          )}
          {usersPlaylists.length > 0 && (
            <section className="homepage__playlists">
              <h2 className="homepage__sectiontitle"><span>Users</span> playlists:</h2>
              <Carousel>
                {usersPlaylists.map((playlist) => (
                  <PlaylistContainer key={playlist.id} playlist={playlist}/>
                ))}
              </Carousel>
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default HomePage;
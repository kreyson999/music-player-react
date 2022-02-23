import React, { useContext, useEffect, useState } from 'react'

const MusicContext = React.createContext()

export function useMusic() {
  return useContext(MusicContext)
}

export function MusicProvider({children}) {
  const [currentMusic, setCurrentMusic] = useState()
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (currentMusic) {
      const audio = new Audio(currentMusic.url)
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
    }
  }, [currentMusic, isPlaying])
  
  const handleChangingMusic = (music) => {
    setCurrentMusic(music)
  }
  
  const handleStatus = () => {
    setIsPlaying(state => !state)
  }
  
  return (
    <MusicContext.Provider value={
      {
        music: currentMusic, 
        change: handleChangingMusic,
        handleStatus,
      }}>
        {children}
    </MusicContext.Provider>
  );
}
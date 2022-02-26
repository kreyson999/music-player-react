import React, { useContext, useEffect, useState } from 'react'

const MusicContext = React.createContext()

export function useMusic() {
  return useContext(MusicContext)
}

export function MusicProvider({children}) {
  const [currentAudio, setCurrentAudio] = useState()
  const [currentMusic, setCurrentMusic] = useState()
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)


  useEffect(() => {
    const updateDuration = (e) => {
      setDuration(e.target.duration)
    }
    if (currentAudio !== undefined) {
      currentAudio.addEventListener('durationchange', updateDuration)
    }
    return () => {
      if (currentAudio !== undefined) {
        currentAudio.removeEventListener('durationchange', updateDuration)
      }
    }
  }, [currentAudio])

  useEffect(() => {
    const updateCurrentTime = (e) => {
      setCurrentTime(e.target.currentTime)
      if (e.target.currentTime === e.target.duration) {
        setIsPlaying(false)
      }
    }
    if (currentAudio !== undefined) {
      currentAudio.addEventListener('timeupdate', updateCurrentTime)
    }
    return () => {
      if (currentAudio !== undefined) {
        currentAudio.removeEventListener('timeupdate', updateCurrentTime)
      }
    }
  }, [currentAudio])

  useEffect(() => {
    if (currentAudio) {
      if (isPlaying) {
        currentAudio.play()
      } else {
        currentAudio.pause()
      }
    }
    return () => {
      if (currentAudio) {
        currentAudio.pause()
      }
    }
  }, [currentAudio, isPlaying])

  useEffect(() => {
    if (currentMusic) {
      setCurrentAudio(new Audio(currentMusic.url))
      setIsPlaying(true)
    }
    return () => {
      if (currentMusic) {
        setCurrentAudio(null)
        setIsPlaying(false)
      }
    }
  }, [currentMusic])
  
  const handleSettingCurrentTime = (time) => {
    if (currentAudio) {
      currentAudio.currentTime = time
    }
  }

  const handleChangingMusic = (music) => {
    if (currentMusic?.title !== music?.title) {
      setCurrentMusic(music)
    }
    setIsPlaying(true)
  }
  
  const handleStatus = () => {
    if (currentAudio && currentAudio.paused) {
      setIsPlaying(true)
    } else if (currentAudio && !currentAudio.paused) {
      setIsPlaying(false)
    }
  }

  const handleSettingVolume = (vol) => {
    if (currentAudio) {
      currentAudio.volume = vol
    }
  }
  
  return (
    <MusicContext.Provider value={
      {
        isPlaying,
        currentMusic: {...currentMusic, 
          duration: duration, 
          currentTime: currentTime,
          volume: currentAudio?.volume ?? 0
        }, 
        handleChangingMusic,
        handleStatus,
        handleSettingCurrentTime,
        handleSettingVolume
      }}>
        {children}
    </MusicContext.Provider>
  );
}
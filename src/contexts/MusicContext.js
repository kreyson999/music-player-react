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
  const [queue, setQueue] = useState([])


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
      // check if audio is ended
      if (e.target.currentTime === e.target.duration) {
        if (queue.length > 0) {
          // get first element of the queue and set it to current music
          const currentQueue = [...queue]
          const firstItem = currentQueue.shift()
          setQueue(currentQueue)
          setCurrentMusic(firstItem)
        } else {
          setIsPlaying(false)
        }
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
  }, [currentAudio, queue])

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
  
  const handleAddToQueue = (music) => {
    const currentQueue = [...queue]
    currentQueue.push(music)
    setQueue(currentQueue)
  }

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
    // check if there is audio and if audio is paused
    if (currentAudio && currentAudio.paused) {
      setIsPlaying(true)
    // check if there is audio but is not paused
    } else if (currentAudio && !currentAudio.paused) {
      setIsPlaying(false)
    } else if (!currentAudio && queue.length > 0) {
      // get first element of the queue and set it to current music
      const currentQueue = [...queue]
      const firstItem = currentQueue.shift()
      setQueue(currentQueue)
      setCurrentMusic(firstItem)
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
        queue,
        handleChangingMusic,
        handleStatus,
        handleSettingCurrentTime,
        handleSettingVolume,
        handleAddToQueue,
      }}>
        {children}
    </MusicContext.Provider>
  );
}
import React, { useCallback, useContext, useEffect, useState } from 'react'

const MusicContext = React.createContext()

export function useMusic() {
  return useContext(MusicContext)
}

export function MusicProvider({children}) {
  const [currentAudio, setCurrentAudio] = useState()
  const [currentSong, setCurrentSong] = useState()
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [queue, setQueue] = useState([])
  const [history, setHistory] = useState([])
  const [volume, setVolume] = useState(0.5)


  const handleAddingSongToQueue = (song) => {
    setQueue([...queue, song])
  }

  const handleSettingSongCurrentTime = (time) => {
    if (currentAudio) {
      currentAudio.currentTime = time
    }
  }

  const handleChangingSong = (song) => {
    if (currentSong?.title !== song?.title) {
      setCurrentSong(song)
    }
    setIsPlaying(true)
  }

  const handleSkipToTheNextSong = useCallback(() => {
    if (queue.length < 1) {
      setIsPlaying(false)
      return
    }
    const currentQueue = [...queue]
    const nextSongInTheQueue = currentQueue.shift()

    setQueue(currentQueue)
    setHistory([...history, currentSong])
    setCurrentSong(nextSongInTheQueue)
  }, [currentSong, history, queue])

  const handleSkipToThePreviousSong = () => {
    if (history.length < 1) return
    const currentHistory = [...history]
    const lastSongInHistory = currentHistory.pop()
    
    setQueue([currentSong, ...queue])
    setHistory(currentHistory)
    setCurrentSong(lastSongInHistory)
  }
  
  const handlePlayingStatus = () => {
    // check if there is audio and if audio is paused
    if (currentAudio && currentAudio.paused) {
      setIsPlaying(true)
    // check if there is audio but is not paused
    } else if (currentAudio && !currentAudio.paused) {
      setIsPlaying(false)
    } else if (!currentAudio && queue.length > 0) {
      // get first element of the queue and set it to current music
      const currentQueue = [...queue]
      const nextSongInTheQueue = currentQueue.shift()

      setQueue(currentQueue)
      setCurrentSong(nextSongInTheQueue)
    }
  }

  const handleSettingVolume = (vol) => {
    setVolume(vol)
  }

  useEffect(() => {
    if (currentAudio) {
      currentAudio.volume = volume
    }
  }, [currentAudio, volume])

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
        handleSkipToTheNextSong()
      }
    }
    if (currentAudio) {
      currentAudio.addEventListener('timeupdate', updateCurrentTime)
    }
    return () => {
      if (currentAudio) {
        currentAudio.removeEventListener('timeupdate', updateCurrentTime)
      }
    }
  }, [currentAudio, queue, history, handleSkipToTheNextSong])

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
    if (currentSong) {
      setCurrentAudio(new Audio(currentSong.url))
      setIsPlaying(true)
    }
    return () => {
      if (currentSong) {
        setCurrentAudio(null)
        setIsPlaying(false)
      }
    }
  }, [currentSong])
  
  return (
    <MusicContext.Provider value={
      {
        isPlaying,
        currentSong: {
          ...currentSong, 
          duration: duration, 
          currentTime: currentTime,
          volume: volume
        }, 
        queue,
        handleChangingSong,
        handlePlayingStatus,
        handleSettingSongCurrentTime,
        handleSettingVolume,
        handleAddingSongToQueue,
        handleSkipToTheNextSong,
        handleSkipToThePreviousSong,
      }}>
        {children}
    </MusicContext.Provider>
  );
}
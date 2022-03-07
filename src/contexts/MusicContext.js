import React, { useCallback, useContext, useEffect, useState } from 'react'

const MusicContext = React.createContext()

export function useMusic() {
  return useContext(MusicContext)
}

export function MusicProvider({children}) {
  const [currentAudio, setCurrentAudio] = useState()
  const [currentSong, setCurrentSong] = useState()
  const [currentPlaylist, setCurrentPlaylist] = useState()
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [queue, setQueue] = useState([])
  const [history, setHistory] = useState([])
  const [volume, setVolume] = useState(0.5)

  const handlePlayThePlaylist = (playlist) => {
    // if (playlist.title === currentPlaylist?.title) return
    handleClearingQueue()

    const currentPlaylistSongs = [...playlist.songs] 
    const nextSongInThePlaylist = currentPlaylistSongs.shift()

    setCurrentSong(nextSongInThePlaylist)
    setCurrentPlaylist({
      ...playlist,
      songs: currentPlaylistSongs
    })
  }

  const handlePlayThePlaylistWithSong = (playlist, index) => {
    handleClearingQueue()

    // const songsBeforeIndex = playlist.songs.slice(0, index)
    const songsAfterIndex = playlist.songs.slice(index)
    const nextSong = songsAfterIndex.shift()

    setCurrentSong(nextSong)
    setCurrentPlaylist({
      ...playlist,
      songs: songsAfterIndex
    })
  }

  const handlePlaySongFromThePlaylist = (index) => {
    const playlistBeforeIndex = currentPlaylist.songs.slice(0, index);
    const playlistAfterIndex = currentPlaylist.songs.slice(index);
    const nextSong = playlistAfterIndex.shift()

    setCurrentPlaylist({
      ...currentPlaylist,
      songs: playlistAfterIndex
    })
    if (currentSong !== null) {
      setHistory([...history, currentSong, ...playlistBeforeIndex])
    } else {
      setHistory([...history, ...playlistBeforeIndex])
    }
    setCurrentSong(nextSong)
  }

  const handlePlaySongFromTheQueue = (index) => {
    const queueBeforeIndex = queue.slice(0, index);
    const queueAfterIndex = queue.slice(index);
    const nextSong = queueAfterIndex.shift()

    setQueue(queueAfterIndex)
    if (currentSong !== null) {
      setHistory([...history, currentSong, ...queueBeforeIndex])
    } else {
      setHistory([...history, ...queueBeforeIndex])
    }
    setCurrentSong(nextSong)
  }

  const handleClearingQueue = () => {
    setQueue([])
  }
  
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
    if (queue.length < 1 && currentPlaylist?.songs?.length < 1 ) {
      setIsPlaying(false)
      return
    }
    if (queue.length > 0) {
      const currentQueue = [...queue]
      const nextSongInTheQueue = currentQueue.shift()

      setQueue(currentQueue)
      setHistory([...history, currentSong])
      setCurrentSong(nextSongInTheQueue)
    } else if (queue.length === 0 && currentPlaylist.songs.length > 0) {
      const currentPlaylistSongs = [...currentPlaylist.songs]
      const nextSongInThePlaylist = currentPlaylistSongs.shift()

      if (currentPlaylistSongs.length === 0) {
        setCurrentPlaylist(null)
      } else {
        setCurrentPlaylist(state => ({
          ...state,
          songs: currentPlaylistSongs
        }))
      }

      setHistory([...history, currentSong])
      setCurrentSong(nextSongInThePlaylist)
    }
  }, [currentSong, history, queue, currentPlaylist])

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
    } else if (!currentAudio && queue.length === 0 && currentPlaylist) {
      const currentPlaylistSongs = [...currentPlaylist.songs]
      const nextSongInThePlaylist = currentPlaylistSongs.shift()

      setCurrentPlaylist(state => ({
        ...state,
        songs: currentPlaylistSongs
      }))
      setCurrentSong(nextSongInThePlaylist)
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
  }, [currentAudio, handleSkipToTheNextSong])

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
      if (window.localStorage.getItem('recentsongs') === null) {
        window.localStorage.setItem('recentsongs', JSON.stringify([currentSong]))
      } else {
        const recentSongs = JSON.parse(window.localStorage.getItem('recentsongs'))
        if (recentSongs.find((obj) => obj.id === currentSong.id) === undefined) {
          window.localStorage.setItem('recentsongs', JSON.stringify([currentSong, ...recentSongs.slice(0, 5)]))
        }
      }
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
        currentPlaylist,
        handleChangingSong,
        handlePlayingStatus,
        handleSettingSongCurrentTime,
        handleSettingVolume,
        handleAddingSongToQueue,
        handleSkipToTheNextSong,
        handleSkipToThePreviousSong,
        handlePlayThePlaylist,
        handlePlaySongFromTheQueue,
        handlePlaySongFromThePlaylist,
        handlePlayThePlaylistWithSong,
      }}>
        {children}
    </MusicContext.Provider>
  );
}
import React, { useContext, useState } from 'react'
import { SongModal, PlaylistModal } from '../components';

const SongModalContext = React.createContext()

export const useModal = () => {
  return useContext(SongModalContext)
}

const SongModalProvider = ({children}) => {
  const [songId, setSongId] = useState()
  const [position, setPosition] = useState({x: 0, y:0})
  const [isVisible, setIsVisible] = useState(false)
  const [isPlaylistVisible, setIsPlaylistVisible] = useState(false)
  const [modalChildren, setModalChildren] = useState(null)

  const showModal = ({ modalChildren, pos, songId }) => {
    setModalChildren(modalChildren)
    setIsVisible(true)
    setPosition({x: pos.x, y: pos.y})
    setSongId(songId)
  }

  const hideModal = () => {
    setIsVisible(false)
  }

  const togglePlaylistModal = () => {
    setIsPlaylistVisible(state => !state)
  }
  
  return (
    <SongModalContext.Provider value={{showModal, hideModal, togglePlaylistModal}} >
      {isVisible && (
        <SongModal 
          position={{
            x: position.x,
            y: position.y,
          }}
        >
          {modalChildren}
        </SongModal>)}
      {isPlaylistVisible && 
      <PlaylistModal songId={songId} togglePlaylistModal={togglePlaylistModal}/>}
      {children}
    </SongModalContext.Provider>
  );
}
 
export default SongModalProvider;
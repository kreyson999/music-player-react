import React, { useContext, useState } from 'react'
import MenuModal from '../components/Home/MenuModal/MenuModal';
import PlaylistModal from '../components/Home/PlaylistModal/PlaylistModal';

const MenuModalContext = React.createContext()

export const useModal = () => {
  return useContext(MenuModalContext)
}

const MenuModalProvider = ({children}) => {
  const [position, setPostion] = useState({x: 0, y:0})
  const [isVisible, setIsVisible] = useState(false)
  const [isPlaylistVisible, setIsPlaylistVisible] = useState(false)
  const [modalChildren, setModalChildren] = useState(null)

  const showModal = (passedChildren, pos) => {
    setModalChildren(passedChildren)
    setIsVisible(true)
    setPostion({x: pos.x, y: pos.y})
  }

  const hideModal = () => {
    setIsVisible(false)
  }

  const togglePlaylistModal = () => {
    setIsPlaylistVisible(state => !state)
  }
  
  return (
    <MenuModalContext.Provider value={{showModal, hideModal, togglePlaylistModal}} >
      {isVisible && (
        <MenuModal 
        position={{
          x: position.x,
          y: position.y,
        }}
        >
          {modalChildren}
        </MenuModal>)}
      {isPlaylistVisible && <PlaylistModal togglePlaylistModal={togglePlaylistModal}/>}
      {children}
    </MenuModalContext.Provider>
  );
}
 
export default MenuModalProvider;
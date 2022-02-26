import React, { useContext, useState } from 'react'
import MenuModal from '../components/Home/MenuModal/MenuModal';

const MenuModalContext = React.createContext()

export const useModal = () => {
  return useContext(MenuModalContext)
}

const MenuModalProvider = ({children}) => {
  const [position, setPostion] = useState({x: 0, y:0})
  const [isVisible, setIsVisible] = useState(false)
  const [modalChildren, setModalChildren] = useState(null)

  const showModal = (passedChildren, pos) => {
    setModalChildren(passedChildren)
    setIsVisible(true)
    setPostion({x: pos.x, y: pos.y})
  }

  const hideModal = () => {
    setIsVisible(false)
  }
  
  return (
    <MenuModalContext.Provider value={{showModal, hideModal}} >
      {isVisible && (
        <MenuModal 
        position={{
          x: position.x,
          y: position.y,
        }}
        >
          {modalChildren}
        </MenuModal>)}
      {children}
    </MenuModalContext.Provider>
  );
}
 
export default MenuModalProvider;
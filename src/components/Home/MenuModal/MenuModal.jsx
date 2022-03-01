import { useModal } from '../../../contexts/MenuModalContext';
import './MenuModal.scss'

const MenuModal = ({children, position}) => {
  const { hideModal } = useModal()
  return (
    <div className="menumodal" onClick={hideModal}>
      <div className='menumodal__item' 
        style={{
          top: position.y,
          left: position.x,
        }}>
          {children}
      </div>
    </div>
  );
}
 
export default MenuModal;
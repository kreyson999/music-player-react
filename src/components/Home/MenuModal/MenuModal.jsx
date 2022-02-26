import { useModal } from '../../../contexts/MenuModalContext';
import './MenuModal.scss'

const MenuModal = ({children, position}) => {
  const modal = useModal()
  return (
    <div className="menumodal" onClick={modal.hideModal}>
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
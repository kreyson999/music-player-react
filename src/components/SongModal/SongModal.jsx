import { useModal } from '../../contexts/SongModalContext';
import './SongModal.scss'

const SongModal = ({children, position}) => {
  const { hideModal } = useModal()
  
  return (
    <div className="songmodal" onClick={hideModal}>
      <div className='songmodal__item' 
        style={{
          top: position.y,
          left: position.x,
        }}>
          {children}
      </div>
    </div>
  );
}
 
export default SongModal;
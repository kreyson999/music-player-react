import { useUser } from '../../../contexts/UserContext';
import { logout } from '../../../services/auth';
import './ProfileButton.scss'

const ProfileButton = () => {
  const user = useUser()
  
  const handleSignOut = async () => {
    try {
      await logout()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button onClick={handleSignOut} className="profilebutton">
      <span className="profilebutton__name">{user ? user.name : 'Unknown'}</span>
      <div className='profilebutton__avatar'>
        <img src={user?.profileUrl !== undefined ? user.profileUrl : 'assets/profile_icon.png'} alt='Your Avatar'/>
      </div>
    </button>
  );
}
 
export default ProfileButton;
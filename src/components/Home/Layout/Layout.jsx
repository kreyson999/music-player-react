import { Outlet } from 'react-router-dom';
import './Layout.scss'

const Layout = () => {
  return ( 
    <>
      <nav className='navbar'>
        <div className="navbar__logo">

        </div>
        <form className="navbar__searchbar">
          <input placeholder='Szukaj'/>
        </form>
      </nav>
      <div className='pageBody'>
        <Outlet/>
      </div>
      <footer className='footer'>
        Footer
      </footer>
    </>
  );
}
 
export default Layout;
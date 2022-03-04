import { Outlet, useNavigate } from "react-router-dom";

import { MusicProvider } from "../../contexts/MusicContext";
import { UserProvider } from "../../contexts/UserContext";
import { MobileCurrentSong, Loader, MusicBar } from "../";

import './Layout.scss'
import { useEffect, useState } from "react";
import { Navbar } from "../";
import { useAuth } from "../../contexts/AuthContext";

const Layout = () => {
  const userAuth = useAuth()
  const navigate = useNavigate()
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    if (!userAuth) {
      navigate('/signin')
    } else {
      setIsLoading(false)
    }
  }, [navigate, userAuth])

  const handleToggleNavbar = () => {
    setIsNavbarOpen(state => !state)
  }
  
  return isLoading ? <Loader/> : (
    <UserProvider>
      <MusicProvider>
        <div className="layout">
          <button onClick={handleToggleNavbar} className="layout__menubutton">
            <img src="/music-player-react/assets/icons/menu.svg" alt="Open Menu" />
          </button>
          <Navbar isOpen={isNavbarOpen} onClick={handleToggleNavbar}/>
          <main className="layout__main">
            <div className="layout__main__page">
              <Outlet/>  
            </div>
          </main>
          <MusicBar/>
          <MobileCurrentSong/>
        </div>
      </MusicProvider>
    </UserProvider>
  );
}
 
export default Layout;
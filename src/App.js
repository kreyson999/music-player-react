import { Routes, Route } from "react-router-dom";

import { AuthProvider } from './contexts/AuthContext';

import Layout from "./components/Shared/Layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PlaylistPage from "./pages/PlaylistPage";
import QueuePage from "./pages/QueuePage";

function App() { 
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="/queue" element={<QueuePage/>}/>
          <Route path="/playlist/:id" element={<PlaylistPage/>}/>
        </Route>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </AuthProvider>

  );
}

export default App;
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from './contexts/AuthContext';

import HomePage from "./pages/HomePage";
import PlaylistPage from "./pages/PlaylistPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import { Layout } from "./components";

function App() { 
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="/playlist/:id" element={<PlaylistPage/>}/>
        </Route>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/signin" element={<SignInPage/>}/>
      </Routes>
    </AuthProvider>

  );
}

export default App;

import { Routes, Route } from "react-router-dom";

import Layout from "./components/Home/Layout/Layout";
import { useAuth } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  const currentUser = useAuth()
  console.log(currentUser)
  
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage/>}/>
      </Route>
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
  );
}

export default App;

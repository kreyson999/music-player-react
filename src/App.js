import { Routes, Route } from "react-router-dom";

import Layout from "./components/Home/Layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() { 
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

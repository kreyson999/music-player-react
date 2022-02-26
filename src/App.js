import { Routes, Route } from "react-router-dom";

import Layout from "./components/Shared/Layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import QueuePage from "./pages/QueuePage";

function App() { 
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path="/queue" element={<QueuePage/>}/>
      </Route>
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/signin";
import Home from "./pages/Home/Home";
import Sidebar from "./components/Sidebar";
import SinglePost from "./components/SinglePost";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={<SinglePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

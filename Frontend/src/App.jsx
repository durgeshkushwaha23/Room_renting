import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Nav";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./components/Login";
import Signup from "./components/Register";
import FindRooms from "./components/Rooms/FindRoom";
import Chat from "./pages/Chat";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/rooms" element={<FindRooms />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;

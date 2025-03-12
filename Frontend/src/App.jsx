
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Nav";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./components/Login";
import Signup from "./components/Register";
import FindRooms from "./components/userRooms/FindRooms";
import Chat from "./pages/Chat";
import Booking from "./components/Rooms/Booking/Booking";
import YourRooms from "./components/Rooms/yourRooms";
import Logout from "./components/Logout";
import { ToastContainer } from "react-toastify";
import CreateRoom from "./components/Rooms/CreateRoom"; // Import CreateRoom component
import EditRoom from "./components/Rooms/EditRoom";
import YourBooking from "./components/Rooms/Booking/YourBooking"

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/findroom" element={<FindRooms />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/yourrooms" element={<YourRooms />} />
        <Route path="/create-room" element={<CreateRoom />} /> Add CreateRoom route
        <Route path="/edit/:id" element={<EditRoom />} /> {/* Add EditRoom route */}
        <Route path="/YourBooking" element={<YourBooking/>} />

        <Route path="/logout" element={<Logout />} />

      </Routes>
    </>
  );
}

export default App;

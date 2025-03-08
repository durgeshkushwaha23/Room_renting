// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/navbar/Nav";
// import Home from "./pages/Home";
// import Contact from "./pages/Contact";
// import Login from "./components/Login";
// import Signup from "./components/Register";
// import FindRooms from "./components/Rooms/FindRoom";
// import Chat from "./pages/Chat";
// import Booking from "./components/Rooms/Booking";
// import YourRooms from "./components/Rooms/yourRooms";
// import { ToastContainer } from "react-toastify";
// import Logout from "./components/Logout";

// function App() {
//   return (
//     <Router>
//         <ToastContainer position="top-right" autoClose={3000} />

//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/rooms" element={<FindRooms />} />
//         <Route path="/chat" element={<Chat />} />
//         <Route path="/booking" element={<Booking />} />
//         <Route path="/yourrooms" element={<YourRooms />} />

//         <Route path="/logout" element={<Logout />} />

//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Nav";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./components/Login";
import Signup from "./components/Register";
import FindRooms from "./components/Rooms/FindRoom";
import Chat from "./pages/Chat";
import Booking from "./components/Rooms/Booking";
import YourRooms from "./components/Rooms/yourRooms";
import Logout from "./components/Logout";
import { ToastContainer } from "react-toastify";

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
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;

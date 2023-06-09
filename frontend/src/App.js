import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Mail from "./pages/Mail";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />

        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/mail/:id" element={<Mail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./componenets/Home";
import SignUp from "./componenets/SignUp";
import Login from "./componenets/Login";
import ForgotPassword from "./componenets/ForgotPassword";
import ResetPassword from "./componenets/ResetPassword";
import Dashboard from "./componenets/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/resetPassword/:token" element={<ResetPassword />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

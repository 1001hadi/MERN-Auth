import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./componenets/SignUp";
import Login from "./componenets/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

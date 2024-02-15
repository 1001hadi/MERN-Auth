import { useState } from "react";
import "../App.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/auth/password-recovery", {
        email,
      })
      .then((res) => {
        if (res.data.status) {
          alert("Check your inbox for the password reset link");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Recover Your Password</h2>
        <label htmlFor="username">Enter your Email:</label>
        <input
          type="text"
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submite">Submit</button>
      </form>
    </div>
  );
}

export default ForgotPassword;

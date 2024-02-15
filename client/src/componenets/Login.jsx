import { useState } from "react";
import "../App.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/auth/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.status) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label htmlFor="username">Email:</label>
        <input
          type="text"
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="text"
          placeholder="*****"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submite">Login</button>
        <p>
          <Link to="/forgotPassword">Forgot Password</Link>
        </p>
        <p>
          Not a user? <Link to="/signup"> Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

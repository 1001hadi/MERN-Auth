import { useState } from "react";
import "../App.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/auth/signup", {
        username,
        email,
        password,
      })
      .then((res) => {
        if (res.data.status) {
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
        <h2>Sign UP</h2>
        <label htmlFor="username">UserName:</label>
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)}
        />

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

        <button type="submite">Sign Up</button>
        <p>
          Already a user? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;

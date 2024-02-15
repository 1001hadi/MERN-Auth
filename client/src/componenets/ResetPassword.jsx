import { useState } from "react";
import "../App.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/auth/resetPassword/${token}`, {
        password,
      })
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <label htmlFor="password">New Password:</label>
        <input
          type="text"
          placeholder="*****"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submite">Reset</button>
      </form>
    </div>
  );
}

export default ResetPassword;

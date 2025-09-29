import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please Fill Your Details");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (res.data.message.includes("success")) {
        localStorage.setItem("user", JSON.stringify(res.data.user)); // ✅ store entire user object
        toast.success("Login SuccessFull");
        navigate("/"); // go to homepage
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="loginPage">
      <div className="loginDiv">
        <div className="loginHeading">
          <h2>Welcome</h2>
          <p>Login To Your Account</p>
        </div>
        <form onSubmit={loginHandler}>
          <div className="loginInputBox">
            <input
              className="loginBox"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="loginBox"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="buttonLogin">
            <button type="submit" className="loginBtn">
              Login
            </button>
          </div>
        </form>
        <div className="forgotCreate">
          <div className="forgotAccount">
            <h3>Forgot Your Password</h3>
          </div>
          <Link to="/signup">
            <div className="signAccount">
              <h3>Create New Account</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

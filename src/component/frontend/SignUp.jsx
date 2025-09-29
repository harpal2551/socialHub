  import React, { useState } from "react";
  import "./SignUp.css";
  import toast from "react-hot-toast";
  import axios from "axios";
  import { Link, useNavigate } from "react-router-dom";

  function SignUp() {
    const native = useNavigate();
    const [personName, setPersonName] = useState("");
    const [userIdName, setUserIdName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);

    const signIn = () => toast.success("Account Created Successfully!");
    const signErr = () => toast.error("Cant Register");

    const submitHandler = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("personName", personName);
      formData.append("userIdName", userIdName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", image); // ✅ image add

      try {
        const res = await axios.post("http://localhost:5000/api/signup", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        native("/login");
        signIn();
        console.log("Submit SuccessFully", res.data);
      } catch (err) {
        console.log("SubmitHandler Error", err);
        signErr();
      }
    };
    
    return (
      <div className="signUpContainer">
        <div className="signUpDiv">
          <div className="signHeading">
            <h3>Create New Account</h3>
          </div>
          <form onSubmit={submitHandler}>
            <div className="signUpInput">
              <input type="text" placeholder="Enter Your Name" onChange={(e) => setPersonName(e.target.value)} />
              <input type="text" placeholder="Enter Your UserName" onChange={(e) => setUserIdName(e.target.value)} />
              <input type="email" placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)} />

              {/* Image Upload */}
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.heic"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {image && <p>{image.name}</p>} {/* ✅ file name show */}
            </div>
            <div className="signUpSubmit">
              <button type="submit">Sign-Up</button>
            </div>
          </form>
          <Link to="/login">
            <div className="alreadyAccount">
              <h3>Already Have Account</h3>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  export default SignUp;

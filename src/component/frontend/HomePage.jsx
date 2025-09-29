import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="navBarDashPage">
      <div className="navBarDash">
        <div className="leftNav">
          <img
            src="https://png.pngtree.com/png-vector/20240804/ourmid/pngtree-colorful-eagal-creative-logo-design-png-image_13375154.png"
            alt=""
          />
        </div>
        <div className="centerNav">
          <input type="search" placeholder=" Search" />
        </div>
        <div className="rightNav">
          <div className="rightProfile">
            <div className="profile">
              <div className="profileNavImg">
                <img
                  src={
                    user && user.image
                      ? `http://localhost:5000/uploads/${user.image}`
                      : "https://i.pinimg.com/736x/66/2b/be/662bbef42e07620cbea41e3ac63a74eb.jpg"
                  }
                  alt="profile"
                />
              </div>
              <span style={{ marginLeft: "8px" }}>
                hey! {user ? user.personName : "Guest"}
              </span>
            </div>
            <div className="profileSetting logout">
              {user ? (
                <button onClick={handleLogout}>Log Out</button>
              ) : (
                <button onClick={handleLogin}>Log In</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

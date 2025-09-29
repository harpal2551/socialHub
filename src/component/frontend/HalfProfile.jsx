import React from "react";
import "./HalfProfile.css";

const HalfProfile = ({ onClose }) => {
  return (
    <>
      <div className="halfProfileContainer">
        <div className="halfProfileDiv">
          <div className="halfProfile">
            <div className="rightProfileImg">
              <img
                src="https://i.pinimg.com/736x/66/2b/be/662bbef42e07620cbea41e3ac63a74eb.jpg"
                alt=""
              />
            </div>
            <div className="profileUserName">
              <div className="personName">
                <h2>Alex</h2>
              </div>
              <div className="personUserName">
                <h4>@Alex007</h4>
              </div>
              <div className="personEmail">
                <p>alex546@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="userProfileBio">
          </div>
        </div>
      </div>
    </>
  );
};

export default HalfProfile;

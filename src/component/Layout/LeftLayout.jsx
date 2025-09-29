import React, { useState } from "react";
import "./LeftLayout.css";
import { Outlet } from "react-router-dom";
import HomePage from "../frontend/HomePage.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGears,
  faIcons,
  faHouse,
  faPlus,
  faComments,
  faUserTie,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import RightPageLayer from "./RightPageLayer.jsx";
import HomePageLayer from "./HomePageLayer.jsx";
import CreatePost from "./CreatePost.jsx";

function LeftLayout() {
  const [showCreatePost, setShowCreatePost] = useState(false);

  return (
    <>
      <HomePage />
      <div className="leftSideLayer">
        <div className="leftLayer">
          <div className="homeMenuLeft">
            <h2>
              <FontAwesomeIcon icon={faHouse} className="homeMenuIcon" /> Home
            </h2>
          </div>

          {/* Create Button */}
          <div
            className="CreateMenuLeft"
            onClick={() => setShowCreatePost(true)}
            style={{ cursor: "pointer" }}
          >
            <h2>
              <FontAwesomeIcon icon={faPlus} className="createMenuIcon" /> Create
            </h2>
          </div>

          <div className="messageMenuLeft">
            <h2>
              <FontAwesomeIcon icon={faComments} className="messageMenuIcon" />{" "}
              Message
            </h2>
          </div>
          <div className="notiMenuLeft">
            <h2>
              <FontAwesomeIcon icon={faIcons} /> Notification
            </h2>
          </div>
          <div className="profileMenuLeft">
            <h2>
              <FontAwesomeIcon icon={faUserTie} /> Profile
            </h2>
          </div>
          <div className="settingMenuLeft">
            <h2>
              <FontAwesomeIcon icon={faSliders} /> Setting
            </h2>
          </div>
        </div>

        <div className="centerLayout">
          <HomePageLayer />
        </div>

        <div className="rightLayout">
          <RightPageLayer />
        </div>
      </div>

      {/* Show Create Post Modal */}
      {showCreatePost && <CreatePost closeModal={() => setShowCreatePost(false)} />}
    </>
  );
}

export default LeftLayout;

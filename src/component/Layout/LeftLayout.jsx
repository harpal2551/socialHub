import React, { useState } from "react";
import "./LeftLayout.css";
import HomePage from "../frontend/HomePage.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPlus,
  faComments,
  faIcons,
  faUserTie,
  faSliders,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import RightPageLayer from "./RightPageLayer.jsx";
import HomePageLayer from "./HomePageLayer.jsx";
import CreatePost from "./CreatePost.jsx";
import WorkOnlyDesktop from "./WorkOnlyDesktop.jsx";

function LeftLayout() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* <HomePage /> */}

      <div className="leftSideLayer">
        {/* Left Sidebar */}
        <div className={`leftLayer ${menuOpen ? "active" : ""}`}>
          <div className="closeMenuIcon">
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => setMenuOpen(false)}
              className="closeMenuBtn"
            />
          </div>

          <div className="homeMenuLeft">
            <h2>
              <FontAwesomeIcon icon={faHouse} className="homeMenuIcon" /> Home
            </h2>
          </div>

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

        {/* Menu Icon (Only Mobile & only when menu closed) */}
        {!menuOpen && (
          <div className="mobileMenuIcon" onClick={() => setMenuOpen(true)}>
            <FontAwesomeIcon icon={faBars} />
          </div>
        )}

        {/* Center & Right remain same */}
        <div className="centerLayout">
          <HomePageLayer />
        </div>
        <div className="rightLayout">
          <RightPageLayer />
        </div>
      </div>

      {/* Show Create Post Modal */}
      {showCreatePost && (
        <CreatePost closeModal={() => setShowCreatePost(false)} />
      )}

      {/* <WorkOnlyDesktop /> */}

    </>
  );
}

export default LeftLayout;

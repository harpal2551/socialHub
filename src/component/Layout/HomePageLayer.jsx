import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage, faShare, faBookmark } from "@fortawesome/free-solid-svg-icons";
import CreatePost from "./CreatePost";
import "./HomePageLayer.css";

function HomePageLayer() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  return (
    <div className="centerContainerDiv">
      <div className="centerContainer">
        <div className="createPostBox">
          <div className="createPostBtn">
            <button onClick={() => setShowCreatePost(true)}>Create Post</button>
          </div>
          <div className="writePost">
            <input type="text" placeholder="What on your mind?" />
            <button className="blogPost">Post</button>
          </div>
        </div>
      </div>

      {showCreatePost && <CreatePost closeModal={() => setShowCreatePost(false)} refreshPosts={fetchPosts} />}

      <div className="posterContainerCard">
        {posts.map((post) => (
          <div key={post._id} className="postCard">
            <div className="cardInfo">
              <div className="postProfile">
                <img
                  src={post.user.image ? `http://localhost:5000/uploads/${post.user.image}` : "https://i.pinimg.com/736x/66/2b/be/662bbef42e07620cbea41e3ac63a74eb.jpg"}
                  alt=""
                />
              </div>
              <div className="posterName">
                <div className="nameUser"><h3>{post.user.personName}</h3></div>
                <div className="userNamePerson"><p>@{post.user.userIdName}</p></div>
              </div>
            </div>

            <div className="cardDesc">
              {post.text && <div className="userDescription"><p>{post.text}</p></div>}
              {post.image && <div className="userUploadImg"><img src={`http://localhost:5000/uploads/${post.image}`} alt="" /></div>}
            </div>

            <div className="PostActionBtn">
              <div className="likeAction"><FontAwesomeIcon icon={faHeart} className="likeIcon" /></div>
              <div className="cmtAction"><FontAwesomeIcon icon={faMessage} className="commentIcon" /></div>
              <div className="shareAction"><FontAwesomeIcon icon={faShare} className="shareIcon" /></div>
              <div className="saveAction"><FontAwesomeIcon icon={faBookmark} className="saveIcon" /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePageLayer;
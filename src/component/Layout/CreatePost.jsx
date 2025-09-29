import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreatePost.css";

const CreatePost = ({ closeModal, refreshPosts }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);

  // Get logged-in user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

 const handlePost = async (e) => {
  e.preventDefault();
  if (!user) return;

  try {
    const formData = new FormData();
    formData.append("text", text);
    formData.append("personName", user.personName);
    formData.append("userIdName", user.userIdName);
    formData.append("userImage", user.image); // profile image
    if (image) formData.append("image", image);

    await axios.post("http://localhost:5000/api/create-post", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    setText("");
    setImage(null);
    closeModal();
    refreshPosts(); // refresh home posts
  } catch (err) {
    console.error("Create post error:", err);
  }
};


  return (
    <div className="overlay">
      <div className="create-post-box">
        <form onSubmit={handlePost}>
          {/* Header */}
          <div className="posterProfile">
            <div className="create-post-header">
              <h2>Create Post</h2>
              <button type="button" className="close-btn" onClick={closeModal}>×</button>
            </div>

            {/* User Info */}
            <div className="user-info">
              {user && (
                <>
                  <img
                    src={user.image ? `http://localhost:5000/uploads/${user.image}` : "https://i.pinimg.com/736x/66/2b/be/662bbef42e07620cbea41e3ac63a74eb.jpg"}
                    alt="profile"
                    className="profile-pic"
                  />
                  <div className="profileId">
                    <p className="username">{user.personName}</p>
                    <p className="userid">@{user.userIdName}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Text Area */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={user ? `What's on your mind, ${user.personName}?` : "What's on your mind?"}
            className="post-textarea"
          />

          {/* Image Upload */}
          <div className="upload-box">
            <label htmlFor="fileUpload" className="upload-label">
              {image ? <img src={URL.createObjectURL(image)} alt="preview" className="preview-img" /> : "Click To Add photos/videos"}
            </label>
            <input
              type="file"
              id="fileUpload"
              className="file-input"
              accept=".jpg,.jpeg,.png,.heic"
              onChange={handleImageUpload}
            />
          </div>

          {/* Post Button */}
          <button type="submit" className="post-btn">Post</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

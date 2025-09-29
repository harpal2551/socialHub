import RegisterUser from '../model/Model.js';
import Post from '../model/Post.js';
import bcrypt from "bcrypt";
import multer from "multer";
import fs from "fs";
import path from "path";

// ✅ create uploads folder if it doesn't exist
const uploadPath = path.join("uploads");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

export const upload = multer({ storage });

// signup controller
export const signUpUser = async (req, res) => {
    try {
        const { personName, userIdName, email, password } = req.body;

        const userExist = await RegisterUser.findOne({ email });
        if (userExist) return res.status(400).json({ message: "Email already registered!" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new RegisterUser({ 
            personName,
            userIdName,
            email,
            password: hashedPassword,
            image: req.file ? req.file.filename : null
        });

        const saveData = await newUser.save();
        res.status(201).json({ message: "User signup successfully", user: saveData });
    } catch (err) {
        console.log("SignUP problem!", err);
        res.status(500).json({ message: "Can't signup" });
    }
};

// login controller
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await RegisterUser.findOne({ email });
        if (!user) return res.status(404).json({ message: "User Not Found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Password is incorrect!" });

        res.status(200).json({ message: "Login success", user });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Something went wrong!" });
    }
};


// Create Post
export const createPost = async (req, res) => {
  try {
    const { text, personName, userIdName, userImage } = req.body;

    const post = new Post({
      text: text || "", // allow empty
      image: req.file ? req.file.filename : null,
      user: {
        personName,
        userIdName,
        image: userImage
      }
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error("Create post error:", err);
    res.status(500).json({ message: 'Error creating post' });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
};
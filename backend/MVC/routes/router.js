import express from 'express';
import multer from 'multer';
import { signUpUser, login, upload, createPost, getPosts } from '../controller/controller.js'; // ✅ import upload

const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) { cb(null, './uploads'); },
//   filename: function(req, file, cb) { cb(null, Date.now() + path.extname(file.originalname)); }
// });
// export const upload = multer({ storage });

router.post('/signup', upload.single("image"), signUpUser);
router.post('/login', login); // fixed
// Routes
router.post('/create-post', upload.single('image'), createPost);
router.get('/posts', getPosts);

export default router;

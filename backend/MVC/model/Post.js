import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  text: { type: String },
  image: { type: String },
  user: {
    personName: String,
    userIdName: String,
    image: String
  }
}, { timestamps: true });

export default mongoose.model("Post", postSchema);

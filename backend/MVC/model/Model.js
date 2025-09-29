import mongoose from 'mongoose';

const signUpModel = new mongoose.Schema({
    personName: { type: String, required: true },
    userIdName: { type: String, require: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true }
}, { collection: 'socialmedialogin' }); // exact collection name

export default mongoose.model('RegisterUser', signUpModel);

import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true,
    },
})
const user = mongoose.model('ChatUsers', userSchema);
export default user;
import mongoose, { Schema } from "mongoose";
var userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
var User = mongoose.model('User', userSchema);
export default User;

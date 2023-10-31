import mongoose, { Document, Schema, Model} from "mongoose";

interface IUser {
    username: string;
    email: string;
    password: string;
}

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });




const User: Model<IUserDocument> = mongoose.model<IUserDocument>('User', userSchema)

export default User;
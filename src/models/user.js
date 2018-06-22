// @flow
import mongoose from 'mongoose';

const { Schema } = mongoose;

export type UserType = {
  email: string,
  password: string,
};

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('user', userSchema);

export default User;

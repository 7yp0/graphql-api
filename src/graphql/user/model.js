// @flow
import mongoose from 'mongoose';

const { Schema: MongoSchema } = mongoose;

export type UserType = {
  id: string,
  email: string,
  password: string,
};

const mongoSchema = new MongoSchema({
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

const User = mongoose.model('user', mongoSchema);

export default User;

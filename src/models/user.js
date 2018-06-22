// @flow
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import config from '../config';
import InvalidCredentialsException from '../exceptions/InvalidCredentialsException';

const { Schema } = mongoose;

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

// ? maybe put into a service? as well as .find`s ?
userSchema.pre('save', async function hashPassword(
  next: Function,
): Promise<void> {
  try {
    const salt = await bcrypt.genSalt(config.saltRounds);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function isValidPassword(
  newPassword: string,
): Promise<void> {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new InvalidCredentialsException(error);
  }
};

const User = mongoose.model('user', userSchema);

export default User;

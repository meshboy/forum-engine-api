/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/13/18
 **/
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

export const schema = {
  email: {
    type: String,
    unique: true,
    required: [true, 'User email is required'],
  },

  passwordHash: {
    type: String,
    required: [true, 'password is required'],
  },
};

const userSchema = new mongoose.Schema(schema, { timestamps: true });

userSchema.methods.comparePassword = function (plainTextPassword, callback) {
  bcrypt.compare(plainTextPassword, this.passwordHash, callback);
};

userSchema.methods.hasPassword = function (plainTextPassword, callback) {
  const saltRounds = 10;
  bcrypt.hash(plainTextPassword, saltRounds, callback);
};

export const User = mongoose.model('Users', userSchema);

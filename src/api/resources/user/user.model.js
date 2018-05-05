/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/13/18
 * */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
// create a mongoose schema and ensure a timestamp is added
const userSchema = new mongoose.Schema(schema, { timestamps: true });

// compare the password with the hashed password
userSchema.methods.comparePassword = function (plainTextPassword) {
  return bcrypt.compareSync(plainTextPassword, this.passwordHash);
};

// generate hash password
userSchema.methods.generateHashPassword = function (plainTextPassword) {
  const saltRounds = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainTextPassword, saltRounds);
};

export const User = mongoose.model('Users', userSchema);

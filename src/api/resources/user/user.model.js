/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/13/18
 **/
export const schema = {
  email: {
    type: String,
    unique: true,
    required: [true, 'User email is required']
  },

  passwordHash: {
    type: String,
    required: [true, 'password is required']
  }

};

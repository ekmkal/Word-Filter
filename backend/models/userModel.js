import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    words: {
      type: Array,
      required: true,
      default: [],
    },
    favs: {
      type: Array,
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.matchPassword = async function matchPassword(enteredPassword) {
  const matchedPassword = await bcrypt.compare(enteredPassword, this.password);
  return matchedPassword;
};

userSchema.pre('save', async function checkPasswordUpdate(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;

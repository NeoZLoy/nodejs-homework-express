const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({

    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },

  })

  const User = mongoose.model('user', user);

  module.exports = User
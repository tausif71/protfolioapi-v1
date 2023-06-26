const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
    trim: true,
    minLength: [10, "username should contain min 10 characters"],
    maxLength: [20, "username should contain max 20 characters"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [10, "password should contain 10 characters"],
  },
  confirmPassword: {
    type: String,
    required: [true, "confirm password is required"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password & Confirm password are not same",
    },
  },
  firstName: {
    type: String,
    required: [true, "Firstname is required"],
  },
  lastName: {
    type: String,
    required: [true, "Lastname is required"],
  },
  middleName: {
    type: String,
  },
  gender: {
    type: String,
    required: [true, "gender is required"],
    enum: {
      values: ["male", "female"],
      message: `{VALUE} is either male or female.`,
    },
  },
  dob: {
    type: Date,
    required: [true, "DOB is required"],
  },
  imageUrl: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    validate: [validator.isEmail, "email id is not in valid format"],
    unique: true,
  },
  mobile: {
    type: String,
    required: [true, "mobile no is required"],
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: (props) => `${props} is not a valid mobile no.`,
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;

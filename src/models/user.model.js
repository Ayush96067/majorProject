import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    coverImage: {
      type: String, // cloudinary url
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// before saving the data into database, encrypt password using bcrypt
// since arrow function doesn't have 'this' reference so use function syntax
userSchema.pre("save", async function (next) {
  /*
  since this function will be called everytime any other field gets 
  modified and that causes problem so check if only password is changed
  */
  if (!this.isModified("password")) return next();

  // if password modified than hash the modified password
  this.password = await bcrypt.hash(this.password, 10);

  // always have to pass next to let the pre middleware know that its work is done and move further
  next();
});

// check if password is correct for login
userSchema.methods.isPasswordCorrect = async function (password) {
  // send true or false for compared value of passwords
  return await bcrypt.compare(password, this.password);
};

/*  JWT : It is a Bearer token which means it act as a key.
    -> whoever has this token is assumed to be authentic person 
    -> data is stored or retrieved from that user 
*/

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },

    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);

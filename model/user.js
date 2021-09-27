const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  is_admin: { type: Boolean, default: false },
  password: { type: String },
  token: { type: String },
});

// userSchema.methods.generateAuthToken = async function () {
//   // Generate an auth token for the user
//   const user = this;
//   const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
//   user.tokens = user.tokens.concat({ token });
//   await user.save();
//   return token;
// };

// userSchema.statics.findByCredentials = async (email, password) => {
//   const user = this;
//   const u = await user.findOne({ email });
//   if (!u) {
//     throw new Error({ error: "Invalid login credentials" });
//   }
//   const isPasswordMatch = await bcrypt.compare(password, u.password);
//   if (!isPasswordMatch) {
//     throw new Error({ error: "Invalid login credentials" });
//   }
//   return u;
// };

userSchema.methods.deleteToken = async function (token, cb) {
  var user = this;

  await user.updateOne({ $unset: { token: 1 } }, function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

module.exports = mongoose.model("user", userSchema);

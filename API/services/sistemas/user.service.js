const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");

var md5 = require("md5");
const User = db.User;

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function authenticate(userParam) {
  const user = await User.findOne({
    email: userParam.email,
    pass: userParam.pass,
  }).select("-pass");
  if (user) {
    const token = jwt.sign({ user }, config.secret, { expiresIn: "24h" });
    return {
      token,
    };
  }
  console.log(user);
}

async function getAll() {
  //return await User.find().select("-pass");

  return await User.find().select("-pass").select("-pass").exec();
}

async function getById(id) {
  return await User.findById(id).select("-pass").exec();
}

async function create(userParam) {
  // validate
  console.log(userParam);
  if (await User.findOne({ email: userParam.email })) {
    throw 'Username "' + userParam.email + '" is already taken';
  }
  userParam.pass = md5(userParam.pass);
  const user = new User(userParam);

  // save user
  await user.save();
}

async function update(id, userParam) {
  const user = await User.findById(id);

  // validate
  if (!user) throw "User not found";
  if (
    user.username !== userParam.username &&
    (await User.findOne({ username: userParam.username }))
  ) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.pass = md5(userParam.pass);
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}

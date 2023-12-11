const User = require('../models/user');
const Message = require('../models/message');
const Chat = require('../models/chat');

const asyncHandler = require('express-async-handler');

exports.index_get = function (req, res, next) {
  res.send({ title: 'Express' });
};

exports.user_get = asyncHandler(async (req, res, next) => {
  const allUser = await User.find().exec();

  res.json({ allUser });
});
exports.user_post = asyncHandler(async (req, res, next) => {
  const user = new User({
    profile: {
      description: req.body.description,
      name: req.body.name,
    },
    username: req.body.username,
    password: req.body.password,
  });
  await user.save();

  res.json({ user });
});

const User = require('../models/user');
const Message = require('../models/message');
const Chat = require('../models/chat');

const asyncHandler = require('express-async-handler');

exports.index_get = function (req, res, next) {
  res.send({ title: 'Express' });
};
// GET users
exports.user_get = asyncHandler(async (req, res, next) => {
  const allUser = await User.find().exec();

  res.json({ allUser });
});
// POST user/Create user
exports.user_post = asyncHandler(async (req, res, next) => {
  const user = new User({
    profile: {
      description: req.body.profile.description,
      name: req.body.profile.name,
    },
    username: req.body.username,
    password: req.body.password,
  });
  await user.save();

  res.json({ user });
});
// GET messages
exports.message_get = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find().exec();

  res.json({ allMessages });
});
// POST message
exports.message_post = asyncHandler(async (req, res, next) => {
  res.json({ message: 'POST' });
});
// GET chats
exports.chat_get = asyncHandler(async (req, res, next) => {
  const allChats = await Chat.find().exec();

  res.json({ allChats });
});
// POST chat
exports.chat_post = asyncHandler(async (req, res, next) => {
  const chat = new Chat({
    name: req.body.name,
    user: req.body.user,
  });
  await chat.save();
  res.json({ chat });
});

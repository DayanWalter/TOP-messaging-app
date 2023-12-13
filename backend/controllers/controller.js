const User = require('../models/user');
const Message = require('../models/message');
const Group = require('../models/group');

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
    username: req.body.username,
    password: req.body.password,
  });
  await user.save();

  res.json({ user });
});
// GET messages
exports.message_user_get = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find()
    .populate('sender')
    .populate('receiver')
    .exec();

  res.json({ allMessages });
});
// POST message
exports.message_user_post = asyncHandler(async (req, res, next) => {
  const message = new Message({
    sender: req.body.sender,
    receiver: {
      user: req.body.receiver,
    },
    text: req.body.text,
  });
  await message.save();
  res.json({ message });

  // res.json({ message: 'POST' });
});
// GET groups
exports.group_get = asyncHandler(async (req, res, next) => {
  const allGroups = await Group.find().exec();

  res.json({ allGroups });
});
// POST group
exports.group_post = asyncHandler(async (req, res, next) => {
  const group = new Group({
    name: req.body.name,
    members: req.body.members,
    messages: req.body.messages,
  });
  await group.save();
  res.json({ group });
});

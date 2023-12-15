const Message = require('../models/message');
const Group = require('../models/group');

const asyncHandler = require('express-async-handler');
// GET home page(test)
exports.index_get = function (req, res, next) {
  res.json({ index: 'GET' });
};
// POST home page(test)
exports.index_post = function (req, res, next) {
  res.json({ index: 'POST' });
};

// GET groups
exports.group_get = asyncHandler(async (req, res, next) => {
  const allGroups = await Group.find().populate('members').exec();

  res.json({ allGroups });
});
// POST group/Create group
exports.group_post = asyncHandler(async (req, res, next) => {
  const group = new Group({
    name: req.body.name,
    members: req.body.members,
    messages: req.body.messages,
  });
  await group.save();
  res.json({ group });
});
// GET messages from user
exports.message_user_get = asyncHandler(async (req, res, next) => {
  const allUserMessages = await Message.find({
    'receiver.user': { $exists: true },
  })
    .populate('sender')
    .populate('receiver.user')
    .exec();

  res.json({ allUserMessages });
});
// POST message to user
exports.message_user_post = asyncHandler(async (req, res, next) => {
  const userMessage = new Message({
    sender: req.body.sender,
    receiver: {
      user: req.body.receiver,
    },
    text: req.body.text,
  });

  // save message in backend
  const savedMessage = await userMessage.save();

  // add message._id to sender
  await User.findByIdAndUpdate(
    req.body.sender,
    { $push: { messages: savedMessage._id } },
    { new: true }
  );

  // add message._id to receiver
  await User.findByIdAndUpdate(
    req.body.receiver,
    { $push: { messages: savedMessage._id } },
    { new: true }
  );

  res.json({ userMessage: savedMessage });
});
// GET messages from group
exports.message_group_get = asyncHandler(async (req, res, next) => {
  const allGroupMessages = await Message.find({
    'receiver.group': { $exists: true },
  })
    .populate('sender')
    .populate('receiver.group')
    .exec();

  res.json({ allGroupMessages });
});
// POST message to group
exports.message_group_post = asyncHandler(async (req, res, next) => {
  const groupMessage = new Message({
    sender: req.body.sender,
    receiver: {
      group: req.body.receiver,
    },
    text: req.body.text,
  });

  // save message in backend
  const savedMessage = await groupMessage.save();

  // add message to group
  await Group.findByIdAndUpdate(
    req.body.receiver,
    { $push: { messages: savedMessage._id } },
    { new: true }
  );

  res.json({ groupMessage: savedMessage });
});

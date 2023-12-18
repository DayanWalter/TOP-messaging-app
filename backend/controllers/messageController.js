const Message = require('../models/message');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');

// GET messages from user
exports.message_user_get = asyncHandler(async (req, res, next) => {
  // Find all messages in which the...
  const messages = await Message.find({
    // receiverID is in params and the...
    'receiver.user': req.params.receiver,
    // senderID in the logged in user(jsonwebtoken)
    sender: req.user._id,
  }).exec();

  res.json({ messages });
});
// POST message to user
exports.message_user_post = asyncHandler(async (req, res, next) => {
  // _id is from jwt.js(user object in done function)
  const senderId = req.user._id;
  // The receiver is in the params
  const receiverId = req.params.receiver;

  const userMessage = new Message({
    sender: senderId,
    receiver: {
      user: receiverId,
    },
    text: req.body.text,
  });

  // save message in backend
  const savedMessage = await userMessage.save();

  // add message._id to sender
  await User.findByIdAndUpdate(
    senderId,
    { $push: { messages: savedMessage._id } },
    { new: true }
  );

  // add message._id to receiver
  await User.findByIdAndUpdate(
    receiverId,
    { $push: { messages: savedMessage._id } },
    { new: true }
  );

  res.json({ userMessage: savedMessage });
});

///TODO: ALL FOR GROUP AS WELL///
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

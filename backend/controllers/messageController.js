const Message = require('../models/message');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');

// GET messages from user
exports.message_user_get = asyncHandler(async (req, res, next) => {
  const receiverId = req.params.receiver;
  const userId = req.user._id;

  // Find all messages in which the...
  const messages = await Message.find({
    $or: [
      // receiver is in the params, OR...
      { 'receiver.user': receiverId, sender: userId },
      // receiver is in the token
      { 'receiver.user': userId, sender: receiverId },
    ],
  })
    // Projection for just the "username"
    .populate('sender', 'username')
    .exec();

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
  const receiverId = req.params.receiver;
  const userId = req.user._id;

  // Find all messages in which the...
  const messages = await Message.find({
    $or: [
      // receiver is in the params, OR...
      { 'receiver.group': receiverId, sender: userId },
      // receiver is in the token
      { 'receiver.group': userId, sender: receiverId },
    ],
  });
  res.json({ messages });
});
// POST message to group
exports.message_group_post = asyncHandler(async (req, res, next) => {
  // _id is from jwt.js(user object in done function)
  const senderId = req.user._id;
  // The receiver is in the params
  const receiverId = req.params.receiver;

  const groupMessage = new Message({
    sender: senderId,
    receiver: {
      group: receiverId,
    },
    text: req.body.text,
  });

  // save message in backend
  const savedMessage = await groupMessage.save();

  // // add message._id to sender
  // await User.findByIdAndUpdate(
  //   senderId,
  //   { $push: { messages: savedMessage._id } },
  //   { new: true }
  // );

  // // add message._id to receiver
  // await Group.findByIdAndUpdate(
  //   receiverId,
  //   { $push: { messages: savedMessage._id } },
  //   { new: true }
  // );

  res.json({ groupMessage: savedMessage });
});

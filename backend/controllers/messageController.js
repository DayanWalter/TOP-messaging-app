const Message = require('../models/message');
const asyncHandler = require('express-async-handler');
/// MESSAGECONTROLLER DONE ///
/// USER ///
// GET messages from user(done)
exports.message_user_get = asyncHandler(async (req, res, next) => {
  // _id is from jwt.js(user object in done function)
  const userId = req.user._id;
  // The receiver is in the params
  const receiverId = req.params.receiver;

  // Find all messages in which the...
  const messages = await Message.find({
    $or: [
      // receiver is in the params, OR...
      { 'receiver.user': receiverId, sender: userId },
      // receiver is in the jwtoken
      { 'receiver.user': userId, sender: receiverId },
    ],
  })
    // Projection for just the "username"
    .populate('sender', 'username')
    .exec();

  res.json({ messages });
});
// POST message to user(done)
exports.message_user_post = asyncHandler(async (req, res, next) => {
  // _id is from jwt.js(user object in done function)
  const userId = req.user._id;

  // The receiver is in the params
  const receiverId = req.params.receiver;

  const userMessage = new Message({
    sender: userId,
    receiver: {
      // The receiver is a user
      user: receiverId,
    },
    text: req.body.text,
  });

  // save message in db
  const savedMessage = await userMessage.save();
  // send saved message to frontend
  res.json({ userMessage: savedMessage });
});
/// GROUPS ///
// GET messages from group(done)
exports.message_group_get = asyncHandler(async (req, res, next) => {
  const receiverId = req.params.receiver;
  // Find all messages in which the...
  const messages = await Message.find({
    // receiver(group) is in the params
    'receiver.group': receiverId,
  })
    // Projection for just the "username"
    .populate('sender', 'username')
    .exec();
  res.json({ messages });
});
// POST message to group(done)
exports.message_group_post = asyncHandler(async (req, res, next) => {
  // _id is from jwt.js(user object in done function)
  const userId = req.user._id;

  // The receiver is in the params
  const receiverId = req.params.receiver;

  const groupMessage = new Message({
    sender: userId,
    receiver: {
      // The receiver is a group
      group: receiverId,
    },
    text: req.body.text,
  });

  // save message in db
  const savedMessage = await groupMessage.save();
  // send saved message to frontend
  res.json({ groupMessage: savedMessage });
});

const Group = require('../models/group');

const asyncHandler = require('express-async-handler');

// GET groups
exports.group_get = asyncHandler(async (req, res, next) => {
  const allGroups = await Group.find().exec();

  res.json({ allGroups });
});

// GET one user
exports.group_detail = asyncHandler(async (req, res, next) => {
  const group = await Group.findById(req.params.id)
    .populate({
      path: 'messages',
      model: 'message',
    })
    .exec();
  if (group === null) {
    // No results.
    const err = new Error('User not found');
    err.status = 404;
    return next(err);
  }

  res.json({ name: group.name, messages: group.messages });
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

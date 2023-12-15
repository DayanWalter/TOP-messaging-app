const Group = require('../models/group');

const asyncHandler = require('express-async-handler');

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

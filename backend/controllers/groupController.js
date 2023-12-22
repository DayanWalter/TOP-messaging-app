const Group = require('../models/group');

const asyncHandler = require('express-async-handler');

// GET groups
exports.group_get = asyncHandler(async (req, res, next) => {
  const allGroups = await Group.find().exec();

  res.json({ allGroups });
});

// GET all groups for search for example
exports.group_list = asyncHandler(async (req, res, next) => {
  console.log(req.query.groupname);
  const searchQuery = req.query.groupname;
  const query = searchQuery ? { groupname: searchQuery } : {};

  const allGroups = await Group.find(query).exec();
  res.json({ allGroups });
});

// GET one group
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
exports.group_add = asyncHandler(async (req, res, next) => {
  const group = new Group({
    name: req.body.name,
  });
  await group.save();
  res.json({ group });
});

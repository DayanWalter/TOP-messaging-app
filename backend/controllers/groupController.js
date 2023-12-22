const Group = require('../models/group');

const asyncHandler = require('express-async-handler');

// GET all groups for search for example
exports.group_list = asyncHandler(async (req, res, next) => {
  const searchQuery = req.query.groupname;
  const query = searchQuery ? { name: searchQuery } : {};
  // console.log(query);
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

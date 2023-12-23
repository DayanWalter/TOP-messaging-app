const Group = require('../models/group');

const asyncHandler = require('express-async-handler');

// GET all groups for search for example
exports.group_search = asyncHandler(async (req, res, next) => {
  const searchQuery = req.query.groupname;
  // Check if the query is true(has a value), if yes, take query as value for username
  const query = searchQuery ? { name: searchQuery } : {};
  const allGroups = await Group.find(query).exec();
  res.json({ allGroups });
});

// GET detail from one group
exports.group_detail = asyncHandler(async (req, res, next) => {
  // Search für a group, get the id from the params
  const group = await Group.findById(req.params.id).exec();
  // If no group is found, send an error
  if (group === null) {
    // No results
    const err = new Error('Group not found');
    err.status = 404;
    return next(err);
  }

  res.json({
    groupname: group.groupname,
  });
});

// POST group/Create group
exports.group_add = asyncHandler(async (req, res, next) => {
  // VALIDATE INPUT, BEFORE CREATING NEW GROUP!!!
  const group = new Group({
    groupname: req.body.groupname,
  });
  await group.save();
  res.json({ group });
});

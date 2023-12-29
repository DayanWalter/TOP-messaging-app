const Group = require('../models/group');

const asyncHandler = require('express-async-handler');

const { body, validationResult } = require('express-validator');

// GET all groups for search for example
exports.group_search = asyncHandler(async (req, res, next) => {
  const searchQuery = req.query.groupname;
  // Check if the query is true(has a value), if yes, take query as value for username
  const query = searchQuery ? { name: searchQuery } : {};
  const all = await Group.find(query).exec();
  res.json({ all });
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
    name: group.name,
  });
});

// POST group/Create group
exports.group_add = [
  // VALIDATE INPUT, BEFORE CREATING NEW GROUP!!!
  body('name', 'Name must not be empty').trim().isLength({ min: 5 }).escape(),

  asyncHandler(async (req, res, next) => {
    const result = validationResult(req);

    const group = new Group({
      name: req.body.name,
    });

    if (result.isEmpty()) {
      await group.save();
      res.json({ group });
    } else {
      res.json({ errors: result.array()[0].msg });
    }

    // const errors = result.array().map((error) => console.log(error.msg));
    // console.log(result.array());
  }),
];

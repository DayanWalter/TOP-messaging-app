const User = require('../models/user');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// POST user/Create user
exports.user_post = asyncHandler(async (req, res, next) => {
  // VALIDATE INPUT, BEFORE CREATING NEW USER!!!
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });
  await user.save();

  res.json({ user });
});

// POST User Login
exports.user_login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  // Authenticate user
  const user = await User.findOne({ username });
  // If user is authenticated...
  if (user.password === password) {
    const autheticatedUser = {
      // set the _id of authenticatedUser
      _id: user._id,
      username,
    };

    // Sign the token with username AND _id(autheticatedUser)
    const token = jwt.sign(autheticatedUser, process.env.ACCESS_TOKEN_SECRET);

    res.send({ user_login: 'Success', token });
  } else {
    res.send({ user_login: 'Failure' });
  }
});

// GET detail from one user
exports.user_detail = asyncHandler(async (req, res, next) => {
  // Search für a user, get the id from the params
  const user = await User.findById(req.params.id).exec();
  // If no user is found, send an error
  if (user === null) {
    // No results
    const err = new Error('User not found');
    err.status = 404;
    return next(err);
  }

  res.json({
    username: user.username,
    name: user.name,
    description: user.description,
  });
});

// GET all users for search for example
exports.user_search = asyncHandler(async (req, res, next) => {
  const searchQuery = req.query.username;
  // Check if the query is true(has a value), if yes, take query as value for username
  const query = searchQuery ? { username: searchQuery } : {};
  const allUser = await User.find(query).exec();
  res.json({ allUser });
});

// PUT for updating one user
exports.user_update = asyncHandler(async (req, res, next) => {
  // Get _id of authorized user
  const senderId = req.user._id;

  // update User
  const updatedUser = await User.findByIdAndUpdate(
    senderId,
    {
      name: req.body.name,
      username: req.body.username,
      description: req.body.description,
    },
    // Return user AFTER update was applied
    { new: true }
  );

  res.json({ updatedUser });
});

// PUT for updating friendlist of user
exports.user_add_to_friendlist = asyncHandler(async (req, res, next) => {
  // Get _id of authorized user
  const senderId = req.user._id;
  // Get _id of friend from params
  const friendId = req.params.id;

  // Update authorized user with...
  await User.findByIdAndUpdate(
    senderId,
    // friendId added to friends-array
    { $push: { friends: friendId } },
    { new: true }
  );
  res.json({ user_add: req.user });
});

// GET Friendlist
exports.friendlist_get = asyncHandler(async (req, res, next) => {
  // Find all users which _ids are in the friends-array of authorized user
  const friends = await User.find({ _id: { $in: req.user.friends } });
  // Send alle friends to frontend
  res.json({ friends });
});

const User = require('../models/user');
const jwt = require('jsonwebtoken');

const asyncHandler = require('express-async-handler');

// POST user/Create user
exports.user_post = asyncHandler(async (req, res, next) => {
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
  const userFromDB = await User.findOne({ username });
  // If user is authenticated...
  if (userFromDB.password === password) {
    const user = {
      // define the _id of the user
      _id: userFromDB._id,
      username,
    };

    // Sign the token with username AND _id
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    res.send({ user_login: 'Success', token });
  } else {
    res.send({ user_login: 'Failure' });
  }
});

// GET one user
exports.user_detail = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)
    .populate({
      path: 'messages',
      model: 'message',
    })
    .exec();
  if (user === null) {
    // No results.
    const err = new Error('User not found');
    err.status = 404;
    return next(err);
  }

  res.json({
    username: user.username,
    messages: user.messages,
    profile: user.profile,
  });
});

// GET all users for search for example
exports.user_list = asyncHandler(async (req, res, next) => {
  console.log(req.user._id);

  const allUser = await User.find().exec();

  res.json({ allUser });
});

///TODO///
// user_put for users
// user_delete for admins

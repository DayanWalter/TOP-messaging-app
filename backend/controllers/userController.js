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

// GET one user
exports.user_detail = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).exec();

  if (user === null) {
    // No results.
    const err = new Error('User not found');
    err.status = 404;
    return next(err);
  }
  res.json({ user, message: 'User detail' });
});

// GET all users
exports.user_list = asyncHandler(async (req, res, next) => {
  const allUser = await User.find().exec();

  res.json({ allUser });
});

// POST User Login
exports.user_login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (user.password === password) {
    const opts = {};
    const secret = 'SECRET';
    const token = jwt.sign({ username }, secret, opts);

    res.send({ user_login: 'Success', token });
  }
  res.send({ user_login: 'Failure' });
});

///TODO///
// user_put for users
// user_delete for admins

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// POST user/Create user
exports.user_post = [
  body('name', 'Name must not be empty').trim().isLength({ min: 5 }).escape(),
  body('password', 'Password too short(min 3)').isLength({
    min: 3,
  }),
  body('confirmpassword', "Passwords aren't the same").custom(
    (value, { req }) => {
      return value === req.body.password;
    }
  ),
  asyncHandler(async (req, res, next) => {
    console.log(req.body);

    // VALIDATE INPUT, BEFORE CREATING NEW USER!!!
    const result = validationResult(req);
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      const user = new User({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
      });

      if (result.isEmpty()) {
        await user.save();
        res.json({ user });
      } else {
        // ERROR
        console.error('Error');
        result.array().map((error) => console.log(error.msg));
      }
    });
  }),
];
// POST User Login
exports.user_login = asyncHandler(async (req, res, next) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });
  const match = await bcrypt.compare(password, user.password);

  if (match) {
    const autheticatedUser = {
      // set the _id and name of authenticatedUser
      _id: user._id,
      name,
    };

    // Sign the token with name AND _id(autheticatedUser)
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
  const searchQuery = req.query.name;
  // Check if the query is true(has a value), if yes, take query as value for name
  const query = searchQuery ? { name: searchQuery } : {};
  const all = await User.find(query).exec();
  res.json({ all });
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

const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');
const message_controller = require('../controllers/messageController');
const group_controller = require('../controllers/groupController');
const passport = require('passport');

// change in strategy the done(true) to done(user.username)
const protectedRoute = passport.authenticate('jwt', { session: false });

/// USER ROUTES ///

// POST request for creating User (works)
router.post('/api/user/create', user_controller.user_post);
// POST request for User Login(works)
router.post('/api/user/login', user_controller.user_login);
// GET request for one User(works)
router.get('/api/user/:id', protectedRoute, user_controller.user_detail);
// Get request for list of all Users(works)
router.get('/api/users', protectedRoute, user_controller.user_search);
// PUT request for updating user
router.put(
  '/api/user/editprofile',
  protectedRoute,
  user_controller.user_update
);
// PUT request for adding user to friendlist
router.put(
  '/api/user/:id/add',
  protectedRoute,
  user_controller.user_add_to_friendlist
);
// GET request for friendlist
router.get('/api/friends', protectedRoute, user_controller.friendlist_get);

/// END USER ROUTES ///

/// MESSAGE ROUTES ///

// GET message(works)
router.get(
  '/api/message/user/:receiver',
  protectedRoute,
  message_controller.message_user_get
);
// POST message(works)
router.post(
  '/api/message/user/:receiver/create',
  protectedRoute,
  message_controller.message_user_post
);
// GET message
router.get(
  '/api/message/group/:receiver',
  protectedRoute,
  message_controller.message_group_get
);
// POST message
router.post(
  '/api/message/group/:receiver/create',
  protectedRoute,
  message_controller.message_group_post
);

/// END MESSAGES ROUTES ///

/// GROUP ROUTES ///

// GET group(works)
router.get('/api/groups', protectedRoute, group_controller.group_search);
// GET request for one User(works)
router.get('/api/group/:id', group_controller.group_detail);

// POST/create group
router.post('/api/group/create', protectedRoute, group_controller.group_add);

/// END GROUP ROUTES ///
module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const user_controller = require('../controllers/userController');
const message_controller = require('../controllers/messageController');
const group_controller = require('../controllers/groupController');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// change in strategy the done(true) to done(user.username)
const protectedRoute = passport.authenticate('jwt', { session: false });

// longer version
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (token == null) return res.sendStatus(401);
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

// GET home page(test)
router.get('/api', controller.index_get);
// POST home page(test)
router.post('/api', controller.index_post);

/// USER ROUTES ///

// POST request for creating User (works)
router.post('/api/user/create', user_controller.user_post);
// GET request for one User(works)
router.get('/api/user/:id', user_controller.user_detail);
// Get request for list of all Users(works)
router.get('/api/users', protectedRoute, user_controller.user_list);
// POST request for User Login(works)
router.post('/api/user/login', user_controller.user_login);

///TODO///
// // DELETE request for delete User
// router.delete('/api/user/:id/delete', user_controller.user_delete);
// // PUT request for update User
// router.put('/api/user/:id/update', user_controller.user_put);
///TODO END///

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

// GET group(works)
router.get('/api/groups', group_controller.group_get);
// GET request for one User(works)
router.get('/api/group/:id', group_controller.group_detail);

// POST group
router.post('/group', group_controller.group_post);

module.exports = router;

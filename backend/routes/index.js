const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const user_controller = require('../controllers/userController');
const message_controller = require('../controllers/messageController');
const group_controller = require('../controllers/groupController');
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// GET home page(test)
router.get('/api', controller.index_get);
// POST home page(test)
router.post('/api', controller.index_post);

/// USER ROUTES ///

// POST request for creating User
router.post('/api/user/create', user_controller.user_post);

// GET request for one User
router.get('/api/user/:id', user_controller.user_detail);
// Get request for list of all Users
router.get('/api/users', authenticateToken, user_controller.user_list);

// POST request for User Login
router.post('/api/user/login', user_controller.user_login);

///TODO///
// // DELETE request for delete User
// router.delete('/api/user/:id/delete', user_controller.user_delete);
// // PUT request for update User
// router.put('/api/user/:id/update', user_controller.user_put);
///TODO END///

// GET message
router.get('/api/message/:receiver', message_controller.message_user_get);
// POST message
router.post(
  '/api/message/:receiver/create',
  authenticateToken,
  message_controller.message_user_post
);
// GET message
router.get('/messageGroup', message_controller.message_group_get);
// POST message
router.post('/messageGroup', message_controller.message_group_post);

// GET group
router.get('/group', group_controller.group_get);
// POST group
router.post('/group', group_controller.group_post);

module.exports = router;

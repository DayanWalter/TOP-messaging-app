const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const user_controller = require('../controllers/userController');

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
router.get('/api/users', user_controller.user_list);

// POST request for User Login
router.post('/api/user/login', user_controller.user_login);

///TODO///
// // DELETE request for delete User
// router.delete('/api/user/:id/delete', user_controller.user_delete);
// // PUT request for update User
// router.put('/api/user/:id/update', user_controller.user_put);
///TODO END///

// GET message
router.get('/messageUser', controller.message_user_get);
// POST message
router.post('/messageUser', controller.message_user_post);
// GET message
router.get('/messageGroup', controller.message_group_get);
// POST message
router.post('/messageGroup', controller.message_group_post);
// GET group
router.get('/group', controller.group_get);
// POST group
router.post('/group', controller.group_post);

module.exports = router;

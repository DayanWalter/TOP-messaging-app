const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
// GET home page
router.get('/', controller.index_get);
// GET ALL users
router.get('/user', controller.user_get);

// POST request for User Login
router.get('/user/login', controller.user_login);

// POST user/Create user
router.post('/user', controller.user_post);
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

const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
// GET home page
router.get('/', controller.index_get);
// GET user
router.get('/user', controller.user_get);
//POST user
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

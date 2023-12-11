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
router.get('/message', controller.message_get);
// POST message
router.post('/message', controller.message_post);
// GET chat
router.get('/chat', controller.chat_get);
// POST chat
router.post('/chat', controller.chat_post);

module.exports = router;

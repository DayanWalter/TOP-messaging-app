const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
// GET home page
router.get('/', controller.index_get);
// GET
router.get('/user', controller.user_get);
router.post('/user', controller.user_post);

module.exports = router;

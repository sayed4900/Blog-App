const express = require('express');
const router = express.Router();
const postConroller = require('../controllers/postController.js')

router.get('/',postConroller.addPost);



module.exports = router;

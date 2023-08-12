const express = require('express');
const router = express.Router();
const postConroller = require('../controllers/postController.js')

router.get("/", postConroller.getAllPosts);
router.get("/:id",postConroller.getPost);
router.post('/add-post',postConroller.addPost);
router.delete('/:id',postConroller.deletePost)
// router.put('/:id',postConroller.updatePost)



module.exports = router;

const express = require('express');
const router = express.Router();
const postConroller = require('../controllers/postController.js');

router.post('/uploads',postConroller.handleFileUpload)
router.get("/", postConroller.getAllPosts);
router.get("/:id",postConroller.getPost);
router.post('/add-post',postConroller.addPost);

router.post('/:id',postConroller.deletePost)
router.put('/:id',postConroller.updatePost)
router.get('/get-img/:imageName',postConroller.getImg)



module.exports = router;

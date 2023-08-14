const express = require('express');
const router = express.Router();
const postConroller = require('../controllers/postController.js');
const multer = require('multer');

router.get("/", postConroller.getAllPosts);
router.get("/:id",postConroller.getPost);
router.post('/add-post',postConroller.addPost);
router.delete('/:id',postConroller.deletePost)
router.put('/:id',postConroller.updatePost)

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null,'../server/public/uploads')
  },
  filename:function(req,file,cb){
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({storage})
router.post('/upload', upload.single('file'), function(req,res){
  const file = req.file;
  res.status(200).json({status:"success",filename:file.filename})
})


module.exports = router;

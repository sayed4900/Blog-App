const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/:id',userController.getUserData);
router.get('/get-user-followers/:id',userController.getUserFollowers);
router.post('/follow',userController.addFollower)
router.post('/unfollow',userController.unfollow)
router.post('/check-follow-status',userController.checkFollowStatus)


module.exports = router;

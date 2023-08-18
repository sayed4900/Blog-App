const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const notificationController = require('../controllers/notificationController')

router.get('/:id',userController.getUserData);
router.get('/get-user-followers/:id',userController.getUserFollowers);
router.get('/get-user-following/:id',userController.getUserFollowing);
router.post('/follow',userController.addFollower)
router.post('/unfollow',userController.unfollow)
router.post('/check-follow-status',userController.checkFollowStatus)
router.post('/create-notification',notificationController.createNotification)
router.get('/:user_id/notifications',notificationController.getNotifications)

module.exports = router;

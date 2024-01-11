const router = require('express').Router();
const {
  getAllUser,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userControllers');


router.route('/').get(getAllUser).post(createUser);


router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser)




router.route('/:userId/friends/:friendId').delete(removeFriend).post(addFriend)

module.exports = router;

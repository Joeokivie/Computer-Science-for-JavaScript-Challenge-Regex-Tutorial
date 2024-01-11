const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController.js');

// /api/courses
router.route('/').get(getThoughts).post(createThought);


router
.route('/')
.get(getThoughts)
.post(createThought);

// /api/courses/:courseId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);
  router.route('/:thoughtid/reactions').post(addReaction)
  
  router.route('/:thoughtid/reactions/:thoughtId').delete(removeReaction)
  


module.exports = router;

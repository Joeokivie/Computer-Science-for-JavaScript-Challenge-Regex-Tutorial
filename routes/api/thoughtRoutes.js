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
.router('/')
.get(getAllThought)
.post(createThought);

// /api/courses/:courseId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);
  router.route('/:thoughtid/reactions').add(reaction)

  router
  .route('/:thoughtid/reactions')
  .post(createReaction);


module.exports = router;

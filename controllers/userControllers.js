const { User, Thought } = require('../models');

module.exports = {
  getAllUser(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a course
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.courseId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a course
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a course
  async deleteUser(req, res) {
    try {
      const userId = req.params.userId;

      // Check if userId is provided
      if (!userId) {
          return res.status(400).json({ message: 'User ID is required!' });
      }

      const user = await User.findOneAndDelete({ _id: userId });

      // Check if the user with the given ID exists
      if (!user) {
          return res.status(404).json({ message: 'No user found with this ID!' });
      }

      res.json({ message: 'User successfully deleted!', deletedUser: user });
  } catch (err) {
      console.error(err.message);

      // Handle different types of errors gracefully
      if (err.name === 'CastError' && err.kind === 'ObjectId') {
          return res.status(400).json({ message: 'Invalid User ID format!' });
      }

      res.status(500).json({ message: 'Internal Server Error' });
  }
  },
  // Update a course
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(500).json({ message: 'no user found with that id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
 },
};

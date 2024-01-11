const { User, Thought } = require('../models');

module.exports = {
  getAllUser(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
 
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  
  async deleteUser(req, res) {
    try {
      const userId = req.params.userId;

      
      if (!userId) {
          return res.status(400).json({ message: 'User ID is required!' });
      }

      const user = await User.findOneAndDelete({ _id: userId });

      
      if (!user) {
          return res.status(404).json({ message: 'No user found with this ID!' });
      }

      res.json({ message: 'User successfully deleted!', deletedUser: user });
  } catch (err) {
      console.error(err.message);

      
      if (err.name === 'CastError' && err.kind === 'ObjectId') {
          return res.status(400).json({ message: 'Invalid User ID format!' });
      }

      res.status(500).json({ message: 'Internal Server Error' });
  }
  },
  
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
   // Add a friend
   async addFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      if (!userId || !friendId) {
        return res.status(400).json({ message: 'User ID and Friend ID are required!' });
      }

      const user = await User.findById(userId);
      const friend = await User.findById(friendId);

      if (!user || !friend) {
        return res.status(404).json({ message: 'User or friend not found!' });
      }

      // Assuming you have a 'friends' field in your user schema
      user.friends.push(friendId);
      await user.save();

      res.json({ message: 'Friend added successfully!', updatedUser: user });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // add friend to friend list
  async addFriend(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });

      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // remove friend from friend list
  async removeFriend(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });

      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};





const {User, Thought} = require('../models');

module.exports = {
    // get all existing users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // get a single user based on ID passed in the params
    getUsersbyID(req, res) {
        User.findOne({_id: req.params.userId})
            .select('-__v')
            .populate('thoughts')
            .populate('friends')
            .then((user) =>
                !user
                    ? res.status(404).json({message: 'That user doesn\'t exist'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // create a new user based on user input (req.body)
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // finding one user based on ID, and updating it.
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true})
            .then((user) =>
                !user
                    ? res.status(404).json({message: 'That user doesn\'t exist'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    
    // finding one user based on ID, and deleteing that user and associated thoughts
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
            .then((user) =>
                !user
                    ? res.status(404).json({message: 'That user doesn\'t exist'})
                    : Thought.deleteMany({_id: {$in: user.thoughts}})
            )
            .then(() => res.json({message: 'User and associated thoughts deleted!'}))
            .catch((err) => res.status(500).json(err));
    },
// Current Path: /api/users/:userId/friends/:friendId

    // add a new friend for the user based on parameters userId and friendId
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
            .then((user) =>
                !user
                    ? res.status(404).json({message: 'That user doesn\'t exist'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // remove an existing friend for the user based on parameters userId and friendId
    removeFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
            .then((user) =>
                !user
                    ? res.status(404).json({message: 'That user doesn\'t exist'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};

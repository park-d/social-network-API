// requiring our User and Thought model
const {User, Thought} = require('../models');

module.exports = {
    //get all thoughts function
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // get a single thought based on the thought ID passed in the params
    getThoughtsbyID(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
            .then((thought) =>
                !thought
                    ? res.status(404).json({message: 'That thought doesn\'t exist'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // create a new thought based on user input (req.body), and push the thought ID from the created thought into the thoughts array in the user model
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    {_id: req.body.userId},
                    {$addToSet: {thoughts: thought._id}},
                    {new: true}
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'Thought created, but found no user with that ID',
                    })
                    : res.json('Created the thought 🎉!')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // finding one thought based on ID, and updating the text.
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({message: 'That thought doesn\'t exist!'})
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // finding one thought based on ID, and deleteing the entire thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({_id: req.params.thoughtId})
            .then((thought) =>
                !thought
                    ? res.status(404).json({message: 'That thought doesn\'t exist!'})
                    : User.findOneAndUpdate(
                        {thoughts: req.params.thoughtId},
                        {$pull: {thoughts: req.params.thoughtId}},
                        {new: true}
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'Thought created but no user with this id!',
                    })
                    : res.json({message: 'Thought successfully deleted!'})
            )
            .catch((err) => res.status(500).json(err));
    },

// Current Path: /api/thoughts/:thoughtId/reactions
    
    // find a thought based on the ID passed through the params, then add a reaction to it based on what is passed through the req.body
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({message: 'That thought doesn\'t exist!'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
// Current Path: /api/thoughts/:thoughtId/reactions/:reactionId
    
    // find a thought based on the ID passed through the params, then remove one of the reactions based on the params
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({message: 'That thought doesn\'t exist!'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },    
};

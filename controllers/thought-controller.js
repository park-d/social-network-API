const {User, Thought} = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getThoughtsbyID(req, res) {
        Thought.findOne({_id: req.params.applicationId})
            .then((thought) =>
                !thought
                    ? res.status(404).json({message: 'That thought doesn\'t exist'})
                    : res.json(application)
            )
            .catch((err) => res.status(500).json(err));
    },
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
///api/thoughts/:thoughtId/reactions
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

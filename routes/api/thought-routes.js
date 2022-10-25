const router = require('express').Router();

const {
    getThoughts,
    getThoughtsbyID,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thought-controller.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtsbyID).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;

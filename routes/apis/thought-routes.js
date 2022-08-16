const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts <GET>
router.route('/').get(getAllThoughts).post(createThought)

//  /api/thoughts/:id <GET, PUT, DELETE>
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

// /api/thoughts/reactions <POST>
router.route('/:thoughtId/reactions').post(addReaction)

// /api/delete/thoughts <DELETE>
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;

const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/user-controller');

// api/user <GET, POST>
router.route('/').get(getAllUser).post(createUser);

//api/users/:id <GET, PUT, DELETE>
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

//api/user/:userId/friends/:friendId <POST, DELETE>
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;
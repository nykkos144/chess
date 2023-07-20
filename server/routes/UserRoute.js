const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth');

const {
    getLoggedUser,
    createUser,
    loginUser,
    getUserById,
    getUserByUsername,
    updateUserGameProps
} = require('../controllers/UserController');


// GET LOGGED USER
router.get('/', auth, getLoggedUser);

// GET USER
// router.post('/', createUser);

// CREATE USER
router.post('/create', createUser);

// LOGIN USER
router.post('/login', loginUser);

// GET USER BY ID
router.get('/:id', getUserById);

// GET USER BY USERNAME
router.get('/search/:username', getUserByUsername);


router.put('/', auth, updateUserGameProps);


module.exports = router;
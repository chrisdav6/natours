const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/users');
const { signup, login } = require('../controllers/authController');

//POST - /api/v1/users/signup
router.post('/signup', signup);

//POST - /api/v1/users/login
router.post('/login', login);

//GET - /api/v1/users
router.get('/', getAllUsers);

//GET - /api/v1/users/:id
router.get('/:id', getUser);

//POST - /api/v1/users
router.post('/', createUser);

//PATCH - /api/v1/users/:id
//Not really updating, just simulating
router.patch('/:id', updateUser);

//DELETE - /api/v1/users/:id
//Not really deleting, just simulating
router.delete('/:id', deleteUser);

module.exports = router;
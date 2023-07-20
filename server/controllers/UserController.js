require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const UserModel = require('../models/UserModel');
const { decodeToken } = require('../middleware/auth');



// get logged user

const getLoggedUser = async (req, res) => {
    
    const userId = req.userId;

    try {

        const user = await UserModel.findOne({ _id: userId }, {
            _id: 1,
            username: 1,
            credits: 1,
            xp: 1,
            created_on: 1,
            last_online: 1
        });

        res.status(200).send(user);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }

}

// create user

const createUser = async (req, res) => {

    const { username, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    try {

        const usernameTaken = await UserModel.exists({ username: username });

        if (username.length === 0) {
            throw new Error('Invalid username');
        }
        if (password.length < 6) {
            throw new Error('Password must be 6+ characters');
        }
        if (usernameTaken) {
            throw new Error('Username already in use');
        }

        await UserModel.create({
            username: username,
            password: hashedPassword
        });

        res.status(200).json({
            message: 'user created'
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

    // console.log(bcrypt.compareSync('a', hashedPassword));

}


// login user

const loginUser = async (req, res) => {

    const { username, password } = req.body;

    try {

        const user = await UserModel.findOne({ username: username }, {
            _id: 1,
            username: 1,
            password: 1
        });
        console.log(user);

        if (!user) {
            throw new Error('Wrong username or password');
        }

        const passwordsMatch = bcrypt.compareSync(password, user.password);

        if (!passwordsMatch) {
            throw new Error('Wrong username or password');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(200).send(token);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }

}


// get user by id

const getUserById = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {  
        return res.status(500).json({
            error: 'invalid id'
        });
    }

    try {

        const user = await UserModel.findById(id, {
            _id: 1,
            username: 1,
            credits: 1,
            xp: 1,
            created_on: 1,
            last_online: 1
        });

        if (!user) {
            return res.status(404).json({
                error: 'not found'
            });
        }

        res.status(200).json({
            message: 'user retrieved',
            user: user
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

}


const getUserByUsername = async (req, res) => {

    const { username } = req.params;

    const jwtToken = req.headers.token;
    
    let loggedUserId;
    if (jwtToken) {
        loggedUserId = decodeToken(jwtToken).id;
    }


    const query = {
        username: {
          $regex: username,
          $options: 'i'
        }
    }
    
    if (loggedUserId) {
        query._id = { $ne: loggedUserId };
    }

    try {

        const users = await UserModel.find(query, {
            _id: 1,
            username : 1,
            image: 1,
            xp: 1,
            last_online: 1
        });

        res.status(200).send(users);
        
        // res.status(200).json({
        //     message: 'users retrieved',
        //     users: users
        // });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

}



const updateUserGameProps = async (req, res) => {

    const userId = req.userId;

    const { xp, credits } = req.body;

    try {

        UserModel.findById(userId)
        .then(user => {
            if (user) {
                user.xp += xp;
                user.credits += credits;
        
                return user.save();
            } else {
                throw new Error('User not found.');
            }
        })
        .then(() => {
            console.log('User XP and credits updated successfully.');
        })
        .catch(error => {
            console.log('Error updating user:', error);
        });

        res.status(200);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }

}



module.exports = {
    getLoggedUser,
    createUser,
    loginUser,
    getUserById,
    getUserByUsername,
    updateUserGameProps
}
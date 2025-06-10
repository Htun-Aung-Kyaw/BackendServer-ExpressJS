// function getUserById(req, res, next) {
//     console.log("Get with userId")
//     res.json({
//         userId: req.params.userId
//     });
// }

let userService = require('../services/usersService');
const {config} = require('../config/Config');
const jwt = require('jsonwebtoken');

const registerUser = async function( req,res,next)
{
    let userName = req.body['username'];
    let password = req.body['password'];
    let email = req.body['email'];
    try
    {
        let user = await userService.register(userName,password,email);
        let payload = { id: user._id };
        const token = jwt.sign(payload, config.TOKEN_SECRET);
        res.status(200).send({ token });
    }
    catch (err) {
        console.log(err)
        res.status(400).send({message:"User already existed"});
    }
}
const login = async function(req,res,next)
{
    let userName = req.body['username'];
    let password = req.body['password'];
    // let email = req.body['email'];
    try
    {
        let user = await userService.login(userName,password);
        // console.log("User",user);
        let payload = { id: user._id };
        const token = jwt.sign(payload, config.TOKEN_SECRET);
        res.status(200).send({ token });
    }
    catch (err) {
        console.log(err)
        res.status(401).send({message:"Invalid user"});
    }
}
const getUserById = async function (req, res, next) {
    console.log('Req ',req.params);
    let userId = req.params.userId;
    try {
        let user = await userService.getUserById(userId);
       // console.log(user);
        let payload = { id: user._id, username: user.username, email: user.email };
        return res.status(200).json(payload);
    }
    catch (err) {
        console.log(err);
        res.status(401).send(err.toString());
    }
}

module.exports = {
    getUserById,
    registerUser,
    login,
}
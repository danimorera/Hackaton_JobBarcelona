const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const User = require('../models/User');


const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('authentication');

    if (!token) {
        return res.status(401).json({
            msg: 'No token'
        });
    };

    try {
        //Note uid is deconstructed from payload
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(uid);
        //check if user exists in DB
        if (!user) {
            return res.status(401).json({
                msg: 'User does not exists'
            });
        };

        //check that user cannot login if deactivated
        if (!user.status) {
            return res.status(401).json({
                msg: 'User is inactive'
            });
        };
        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({
            msg: 'Access denied, invalid token'
        });
    };
};

module.exports = { validateJWT };
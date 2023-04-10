const jwt = require("jsonwebtoken");
const User = require('../models/User');

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("Token could not be created");
            } else {
                resolve(token);
            }
        });
    });
};


//validation for the sockets
const checkJWT = async (token) => {
    try {
        if (token.length < 10) {
            return null;
        }

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(uid);

        if(!user){
            return null;
        };
        if(user.status == false){
            return null;
        }
        return user;

    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    generateJWT,
    checkJWT
};
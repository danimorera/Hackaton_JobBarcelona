const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/User');

const { generateJWT } = require('../helpers/generateJWT');
const { googleVerify } = require("../helpers/google-verify");

//TODO capture errors in register
const register = async (req = request, res = response) => {

    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    //hash password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        user
    });
};

const login = async (req, res = response) => {

    const { email, password } = req.body;
    try {
        //Check that email exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: "Email not valid"
            });
        };

        //check user status (this app does not delete data)
        if (!user.status) {
            return res.status(400).json({
                msg: "User is not active"
            });
        };

        //check password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Password not valid"
            });
        };
        //generate jwt
        const token = await generateJWT(user.id);

        res.status(200).json({
            user,
            token
        });

    } catch (error) {
        res.status(500).json({
            msg: "Server problem when login in"
        });
    };
};

const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {
        const { name, email, img } = await googleVerify(id_token);
        let user = await User.findOne({ email });
        //User does not exists, creates a new user
        if (!user) {
            const data = {
                name,
                email,
                password: 'X',
                img,
                google: true
            };
            user = new User(data);
            await user.save();
        } else {
            //UPDATES info with google's
            user.name = name;
            user.img = img;
            user.google = true;
            await user.save();
        }

        //user with data in db but not active (status==false)
        if (!user.status) {
            return res.status(401).json({
                msg: 'User not active'
            });
        };

        //generates the token for the new login
        const token = await generateJWT(user.id);
        res.json({
            user,
            token
        });

    } catch (error) {
        res.status(500).json({
            msg: 'google auth went wrong'
        });
    };
};

const validateToken = async (req = request, res = response) => {
    const { user } = req;
    const token = await generateJWT(user.id);
    res.json({
        user,
        token
    });
}

module.exports = {
    register,
    login,
    googleSignIn,
    validateToken
};
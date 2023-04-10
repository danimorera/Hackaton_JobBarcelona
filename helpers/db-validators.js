
const User = require('../models/User')

const emailExists = async (email = '') => {
    const existsEmail = await User.findOne({ email });
    if (existsEmail) {
        throw new Error(`This mail ${email} is already registered`);
    };
};

const existsUserById = async (id) => {
    const existsUser = await User.findById(id);
    if (!existsUser) {
        throw new Error(`This id ${id} does not exists`);
    };
};

module.exports = {
    emailExists,
    existsUserById
};
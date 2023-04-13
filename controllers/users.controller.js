const { response, request } = require('express');
const User = require('../models/User');

const usersGet = async (req = request, res = response) => {
    const queryActive = { status: true }

    const { limit = 5, from = 0 } = req.query;

    const [total, users] = await Promise.all([
        User.countDocuments(queryActive),
        User.find(queryActive)
            .limit(Number(limit))
            .skip(Number(from))
    ]);

    res.json({
        total,
        users
    });
};

module.exports = {usersGet}
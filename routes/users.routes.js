const router = require('express').Router()
//const { check } = require('express-validator')

const {
    usersGet
} = require('../controllers/users.controller');

router.get('/', usersGet);

module.exports = router;
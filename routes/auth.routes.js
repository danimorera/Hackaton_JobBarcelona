const router = require("express").Router();
const { check } = require("express-validator");


//CONTROLLERS
const { register, login, googleSignIn, validateToken } = require("../controllers/auth.controller");

//MIDDLEWARES
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

//HELPERS
const { emailExists } = require('../helpers/db-validators');

//ROUTES

router.post('/github', [
    check('id_token', 'ID_Token necessary').not().isEmpty(),
    validateFields
], googleSignIn);

router.post('/login', [
    check('email', 'Email is not valid').isEmail(),
    check('password', 'password is mandatory').not().isEmpty(),
    validateFields
], login);

router.post('/google', [
    check('id_token', 'ID_Token necessary').not().isEmpty(),
    validateFields
], googleSignIn);

router.post('/register', [
    check('name', 'name is mandatory').not().isEmpty(),
    check('password', 'password needs 6 chars at least').isLength({ min: 6 }),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(emailExists),
    validateFields
], register);

router.get('/', validateJWT, validateToken)

module.exports = router;
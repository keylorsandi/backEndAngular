/*
    URL   ===   /api/login
*/
const { Router } = require('express');
const { body } = require('express-validator');
const { authLogin, googleSignin, renewToken } = require('../controllers/authController');
const { validatorFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-JWT');

const router = Router();

router.post('/', [
    body('email', ' The email is required').isEmail(),
    body('password', 'The password is required').not().isEmpty(),
    validatorFields
], authLogin);
router.post('/googlesignin', [
    body('token', 'The token is required').notEmpty(),
    validatorFields
], googleSignin);
router.get('/renew', [
    validateJWT
], renewToken);
module.exports = router;
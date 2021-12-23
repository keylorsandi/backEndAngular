/*
    URL   ===   /api/login
*/
const { Router } = require('express');
const { body } = require('express-validator');
const { authLogin } = require('../controllers/authController');
const { validatorFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/', [
    body('email', ' The email is required').isEmail(),
    body('password', 'The password is required').not().isEmpty(),
    validatorFields
], authLogin)


module.exports = router;
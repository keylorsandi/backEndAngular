/*
URL === /api/users
*/
const { Router } = require('express');
const { getUsers, postUsers, putUsers, deleteUsers } = require('../controllers/usersControllers');
const { body } = require('express-validator');
const { validatorFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-JWT');


const router = Router();

router.get('/', [validateJWT], getUsers);

router.post('/', [
    body('name', 'Name field is empty').notEmpty(),
    body('lastName', 'Last Name field is empty').notEmpty(),
    body('password', 'Password field is empty').notEmpty(),
    body('email', 'Email field have inconsistencies').isEmail(),
    validatorFields
], postUsers);
router.put('/:id', [
    validateJWT,
    body('name', 'Name field is empty').notEmpty(),
    body('lastName', 'Last Name field is empty').notEmpty(),
    body('email', 'Email field have inconsistencies').isEmail(),
    body('role', 'Role field is empty').notEmpty(),
    validatorFields
], putUsers);
router.delete('/:id', [validateJWT], deleteUsers);



module.exports = router;
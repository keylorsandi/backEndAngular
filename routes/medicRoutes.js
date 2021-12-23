const { Router } = require('express');
const { body } = require('express-validator');
const { getMedics, postMedics, updateMedics, deleteMedics } = require('../controllers/medicController');
const { validatorFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-JWT');

const router = Router();

router.get('/', validateJWT, getMedics);
router.post('/', [
    validateJWT,
    body('name', 'The name is required').notEmpty(),
    body('lastName', 'The last name is required').notEmpty(),
    body('hospitalID', 'The hospital´s id isn`t valid').isMongoId(),
    validatorFields
], postMedics);
router.put('/:id', validatorFields, updateMedics);
router.delete('/:id', validateJWT, deleteMedics);

module.exports = router;
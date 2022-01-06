/* 
URL==== /api/hospitals
*/

const { Router } = require('express');
const { body } = require('express-validator');
const { getHospitals, postHospitals, updateHospitals, deleteHospitals } = require('../controllers/hospitalController');
const { validateJWT } = require('../middlewares/validate-JWT');
const { validatorFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', validateJWT, getHospitals);
router.post('/', [
    validateJWT,
    body('name', 'Name is required').notEmpty(),
    validatorFields
], postHospitals);
router.put('/:id', [
    validateJWT,
    body('name', 'Name is required').notEmpty()
], updateHospitals);
router.delete('/:id',
    validateJWT, deleteHospitals);

module.exports = router;
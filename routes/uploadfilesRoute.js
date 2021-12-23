/*
    URL   ===   /api/uploadfile
*/
const { Router } = require('express');
const fileUpload = require('express-fileupload');

const { uploadFile } = require('../controllers/uploadfilesController');
const { returnImg } = require('../controllers/returnImgController')
const { validateJWT } = require('../middlewares/validate-JWT');

const router = Router();

router.use(fileUpload());

router.put('/:table/:id', [
    validateJWT
], uploadFile);
router.get('/:table/:img', [], returnImg)



module.exports = router;
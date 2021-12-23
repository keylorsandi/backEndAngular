/*
    URL   ===   /api/search
*/
const { Router } = require('express');
const { searcher, searchByColection } = require('../controllers/searcherController');
const { validateJWT } = require('../middlewares/validate-JWT');

const router = Router();

router.get('/:search', [
    validateJWT
], searcher)
router.get('/colection/:table/:search', [
    validateJWT
], searchByColection)


module.exports = router;
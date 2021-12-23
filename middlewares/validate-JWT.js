const { response } = require("express");
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {

    const token = req.header('token');
    const SECRETKEY = process.env.SECRET_KEY_JWT;

    if (!token) {
        return res.status('401').json({
            ok: false,
            msg: 'Unauthorized'
        });
    }
    try {

        const { uid } = jwt.verify(token, SECRETKEY);
        req.uid = uid;


        next();
    } catch (error) {
        return res.status('401').json({
            ok: false,
            msg: 'Unauthorized',
            ERROR: error
        });



    };
}

module.exports = { validateJWT };
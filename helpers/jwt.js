const jwt = require('jsonwebtoken');


const generateJWT = (uid) => {

    return new Promise((resolve, reject) => {
        const payload = {
            uid
        };
        const privateKey = process.env.SECRET_KEY_JWT;

        jwt.sign(payload, privateKey, { expiresIn: '12h' }, (err, token) => {

            if (err) {
                reject(err, 'ERROR unexpected');
            }
            resolve(token)

        });
    });

};

module.exports = {
    generateJWT
};
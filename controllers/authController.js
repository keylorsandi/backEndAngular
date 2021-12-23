const { response } = require("express");
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../helpers/jwt");

const authLogin = async(req, res = response) => {
    try {

        const { email, password } = req.body;

        const userDb = await User.findOne({ email });

        if (!userDb) {

            return res.status('404').json({
                ok: false,
                msg: "Email or password are incorrect"
            });
        };

        const passwordValidate = bcrypt.compareSync(password, userDb.password);

        if (!passwordValidate) {
            return res.status('400').json({
                ok: false,
                msg: "Email or password are incorrect"
            });
        };

        const { _id, name, role } = userDb
        const token = await generateJWT(_id, name, role);
        return res.status('200').json({
            ok: true,
            msg: "You login successfully",
            token: token
        });

    } catch (error) {
        return res.status('500').json({
            ok: false,
            msg: 'Contact whit support.'
        })
    }
}

module.exports = { authLogin }
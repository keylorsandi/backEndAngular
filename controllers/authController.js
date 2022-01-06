const { response } = require("express");
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

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
        //create JWT
        const token = await generateJWT(userDb._id);

        return res.status('200').json({
            ok: true,
            msg: "You login successfully",
            token: token
        });

    } catch (error) {
        return res.status('500').json({
            ok: false,
            msg: 'Contact whit support.'
        });
    };
}

const googleSignin = async(req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { given_name, family_name, email, picture } = await googleVerify(googleToken);

        const userDb = await User.findOne({ email });
        let user;
        if (!userDb) {
            user = new User({
                name: given_name,
                lastName: family_name,
                email,
                password: '123',
                role: "admin",
                google: true,
                state: true,
                img: picture
            });
        } else {
            user = userDb;
            user.google = true;
        }
        await user.save();

        const token = await generateJWT(user._id);

        res.json({
            msg: "Login succes",
            token
        });
    } catch (error) {
        res.status('401').json({
            msg: "The token is not valid"
        });
    };

};

const renewToken = async(req, res) => {

    const uid = req.uid

    const token = await generateJWT(uid);

    res.json({
        msg: "tas chido",
        uid
    });
}

module.exports = { authLogin, googleSignin, renewToken }
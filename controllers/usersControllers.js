const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async(req, res) => {

    const from = Number(req.query.from) || 0;



    const [users, total] = await Promise.all([ //el Promise.all funciona para que ejecute todas las promesas al mismo tiempo
        User.find({}, 'name email role google img') //filter fields to see
        .skip(from) //salta hasta la posicion en el array
        .limit(5), //limite de paginacion
        User.count() //cuenta la cantidad de elementos que hay en la coleccion de la base de datos
    ])


    res.json({
        ok: true,
        Users: users,
        Total: total
    });
}

const postUsers = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const emailExist = await User.findOne({ email });

        if (emailExist) {
            return res.status('400').json({
                ok: false,
                msg: 'The email already exist.'
            });
        }

        const user = new User(req.body);

        //encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt)


        //save user
        await user.save();

        const token = await generateJWT(user.id, user.name, user.role);

        return res.status('200').json({
            ok: true,
            user,
            token
        });

    } catch (error) {

        res.status('500').json({
            ok: false,
            msg: "insertion fail"
        });

    }
}

const putUsers = async(req, res = response) => {
    const uId = req.params.id;
    try {
        const userDB = await User.findById(uId);

        if (!userDB) {
            return res.status('404').json({
                ok: false,
                msg: "User required doesn't exist"
            })
        };
        const { password, google, email, ...fields } = req.body;

        if (userDB.email !== email) {

            const emailExist = await User.findOne({ email });

            if (emailExist) {
                return res.status('400').json({
                    ok: false,
                    msg: "The email already exist. ",
                })
            }
        };
        fields.email = email;
        const userUpdated = await User.findByIdAndUpdate(uId, fields, { new: true });

        return res.status('200').json({
            ok: true,
            msg: "Updated Successfully",
            User: userUpdated
        });
    } catch (error) {
        res.status('500').json({
            ok: false,
            msg: "Update fail"
        });
    }
}
const deleteUsers = async(req, res = response) => {
    const uId = req.params.id
    try {
        const userDB = await User.findById(uId);

        if (!userDB) {
            return res.status('404').json({
                ok: false,
                msg: " User required doesn't exist"
            })
        }

        const field = req.body;
        const userDeleted = await User.findByIdAndUpdate(uId, field, { new: true });
        const { id, name, lastName } = userDeleted
        return res.status('200').json({
            ok: true,
            msg: "Deleted Successfully",
            User: name + " " + lastName,
            UserID: id
        });
    } catch (error) {
        res.status('500').json({
            ok: false,
            msg: "Update fail"
        });
    }
}

module.exports = { getUsers, postUsers, putUsers, deleteUsers }
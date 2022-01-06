const { response } = require("express");
const Medic = require('../models/medicModel')


const getMedics = async(req, res = response) => {

    try {
        const medics = await Medic.find().populate('userID', 'name').populate('hospitalID', 'name');

        res.status('200').json({
            Medics: medics
        });
    } catch (error) {
        res.status('404').json({
            ok: false,
            msg: 'Not Found'
        })
    }

};

const postMedics = async(req, res = response) => {

    const { name, lastName } = req.body;
    const uid = req.uid;

    try {

        const medicExist = await Medic.findOne({ name, lastName });

        if (medicExist) {
            return res.status('400').json({
                ok: false,
                msg: 'An medic already exist whit this name and last name.'
            });
        };
        const medic = new Medic({ userID: uid, ...req.body });


        await medic.save();

        res.status('200').json({
            ok: true,
            Medic: medic
        });
    } catch (error) {
        res.status('400').json({
            ok: false,
            msg: 'bad request'
        });
    }
};

const updateMedics = async(req, res = response) => {
    const uId = req.uId;
    const { name, lastName, hospitalID } = req.body;
    const mId = req.params.id

    try {
        const medicDB = await Medic.findById(mId);
        console.log(medicDB)
        if (!medicDB) {

            res.status('404').json({
                msg: "This Medic doesn't exist."
            });
        }

        const medicChanges = {
            name,
            lastName,
            user: uId,
            hospitalID
        }
        const medicUpdated = await Medic.findByIdAndUpdate(mId, medicChanges, { new: true })

        return res.status('200').json({
            msg: "Medic was updated",
            Medic: medicUpdated
        });
    } catch (error) {
        return res.status('500').json({
            ok: false,
            msg: 'Contact whit support.'
        });
    }
};

const deleteMedics = async(req, res = response) => {
    const mId = req.params.id;

    try {

        const medic = await Medic.findById(mId);
        if (!medic) {
            res.status('404').json({
                msg: "This Medic doesn't exist."
            });
        };

        const medicChanges = {
            state: false
        };

        const medicDeleted = await Medic.findByIdAndUpdate(mId, medicChanges, { new: true });

        const { id, name } = medicDeleted
        return res.status('200').json({
            msg: "Medic was eliminated",
            Medic: name,
            MedicID: id
        });

    } catch (error) {
        return res.status('500').json({
            ok: false,
            msg: 'Contact whit support.'
        });
    };
}

module.exports = { getMedics, postMedics, updateMedics, deleteMedics };
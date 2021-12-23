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
    res.status('200').json({
        Medics: 'medics'
    });
};

const deleteMedics = async(req, res = response) => {
    res.status('200').json({
        Medics: 'medics'
    });
}

module.exports = { getMedics, postMedics, updateMedics, deleteMedics };
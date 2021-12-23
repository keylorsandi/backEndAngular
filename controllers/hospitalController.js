const { response } = require("express");
const Hospital = require('../models/hospitalModel')


const getHospitals = async(req, res = response) => {

    try {
        const hospitals = await Hospital.find().populate('userID', 'name lastName');
        res.status('200').json({
            Hospitals: hospitals
        });
    } catch (error) {
        res.status('404').json({
            ok: false,
            msg: 'Not Found'
        })
    }

};

const postHospitals = async(req, res = response) => {
    const { name } = req.body;
    const uid = req.uid;

    try {
        const nameExist = await Hospital.findOne({ name });

        if (nameExist) {
            return res.status('400').json({
                ok: false,
                msg: 'An Hospital already exist whit this name'
            });
        };

        const hospital = new Hospital({ userID: uid, ...req.body });

        await hospital.save()

        res.status('200').json({
            Hospitals: hospital
        });
    } catch (error) {
        res.status('400').json({
            ok: false,
            msg: 'bad request'
        });
    }
};

const updateHospitals = async(req, res = response) => {
    res.status('200').json({
        Hospitals: 'hospitals'
    });
};

const deleteHospitals = async(req, res = response) => {
    res.status('200').json({
        Hospitals: 'hospitals'
    });
}

module.exports = { getHospitals, postHospitals, updateHospitals, deleteHospitals };
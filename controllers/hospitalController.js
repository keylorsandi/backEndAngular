const { response } = require("express");
const { findOne } = require("../models/hospitalModel");
const Hospital = require('../models/hospitalModel')


const getHospitals = async(req, res = response) => {

    try {
        const hospitals = await Hospital.find().populate('userID', 'name lastName');

        if (hospitals.length == 0) {
            res.status('404').json({
                msg: "Hospitals not Found"
            })
        }
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

    const { name } = req.body;
    const hId = req.params.id;
    const uId = req.uId;
    try {
        const hospital = await Hospital.findById(hId)
        if (!hospital) {
            res.status('404').json({
                msg: "This Hospital doesn't exist."
            });
        };

        const nameExist = await Hospital.findOne({ name });
        console.log(name)
        if (nameExist) {
            return res.status('400').json({
                msg: "This name already exist"
            });
        };

        const hospitalChanges = {
            name,
            userID: uId
        };

        const hospitalUpdated = await Hospital.findByIdAndUpdate(hId, hospitalChanges, { new: true });

        res.status('200').json({
            Hospital: hospitalUpdated
        });
    } catch (error) {
        return res.status('500').json({
            ok: false,
            msg: 'Contact whit support.'
        });
    };

};

const deleteHospitals = async(req, res = response) => {

    const hId = req.params.id;

    try {

        const hospital = await Hospital.findById(hId)
        if (!hospital) {
            res.status('404').json({
                msg: "This Hospital doesn't exist."
            });
        };

        const hospitalChanges = {
            state: false
        };

        const hospitalDeleted = await Hospital.findByIdAndUpdate(hId, hospitalChanges, { new: true });

        const { id, name } = hospitalDeleted
        return res.status('200').json({
            msg: "Hospital was eliminated",
            Hospital: name,
            HospitalID: id
        });

    } catch (error) {
        return res.status('500').json({
            ok: false,
            msg: 'Contact whit support.'
        });
    };
}

module.exports = { getHospitals, postHospitals, updateHospitals, deleteHospitals };
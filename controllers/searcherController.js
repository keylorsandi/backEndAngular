const { response } = require("express");
const User = require('../models/userModel');
const Medic = require('../models/medicModel');
const Hospital = require('../models/hospitalModel');

const searcher = async(req, res = response) => {
    try {

        const search = req.params.search;
        const regex = new RegExp(search, 'i');

        const [users, hospitals, medics] = await Promise.all([
            User.find({ name: regex }),
            Hospital.find({ name: regex }),
            Medic.find({ name: regex }),
        ])

        res.json({
            msg: 'hola que hace',
            users,
            medics,
            hospitals
        })
    } catch (error) {
        return res.status('500').json({
            ok: false,
            msg: 'Contact whit support.'
        })
    }
}
const searchByColection = async(req, res = response) => {
    try {

        const table = req.params.table;
        const search = req.params.search;
        const regex = new RegExp(search, 'i');
        let data = [];

        switch (table) {
            case 'medics':
                data = await Medic.find({ name: regex }).populate('userID', 'name lastName').populate('hospitalID', 'name');
                break;
            case 'hospitals':
                data = await Hospital.find({ name: regex }).populate('userID', 'name lastName');
                break;
            case 'users':
                data = await User.find({ name: regex });
                break;
            default:
                res.status('404').json({
                    msg: 'Error Colections are  hospitals, medics, users'
                });

        }

        res.status('200').json({
            Response: data
        })
    } catch (error) {
        return res.status('500').json({
            ok: false,
            msg: 'Contact whit support.'
        })
    }
}
module.exports = { searcher, searchByColection }
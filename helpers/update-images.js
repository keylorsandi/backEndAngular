const fs = require('fs');
const path = require('path');

const Hospital = require('../models/hospitalModel');
const Medic = require('../models/medicModel');
const User = require('../models/userModel');

const deleteImg = async(path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    };
}

const updateImg = async(table, id, fileName) => {
    let oldPath = `./uploads/${table}`;
    switch (table) {
        case 'User':

            const user = await User.findById(id);
            if (!user) {
                console.log('Not is a User by ID');
                return false;
            };
            oldPath += `/${user.img}`;
            deleteImg(oldPath);
            user.img = fileName;
            await user.save();
            return true;
            break;
        case 'Medic':
            const medic = await Medic.findById(id);
            if (!medic) {
                console.log('Not is a Medic by ID');
                return false;
            }
            oldPath += `/${medic.img}`;
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            };
            medic.img = fileName;
            await medic.save();
            return true;

            break;
        case 'Hospial':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('Not is a Hospital by id');
                return false;
            }
            oldPath += `/${hospital.img}`;
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            };
            hospital.img = fileName;
            await hospital.save();
            return true;

            break;

        default:
            break;
    }

}

module.exports = { updateImg };
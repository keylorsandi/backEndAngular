const response = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImg } = require('../helpers/update-images');

const uploadFile = async(req, res = response) => {
    try {

        const table = req.params.table;
        const id = req.params.id;

        const validTables = ['User', 'Hospital', 'Medic']

        if (!validTables.includes(table)) {
            return res.status(400).json({
                msg: 'Is not a Hostpital, Medic or User (table)'
            });
        };

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                msg: 'No files were uploaded.'
            });
        };

        const file = req.files.img;
        const cutname = file.name.split('.');
        const fileExtension = cutname[cutname.length - 1];
        const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];

        if (!validExtensions.includes(fileExtension)) {
            return res.status(400).json({
                msg: 'Not a valid file extension.'
            });
        };

        const fileName = `${uuidv4()}.${fileExtension}`;

        const path = `./uploads/${table}/${fileName}`;

        file.mv(path, (err) => {
            if (err) {
                console.log(err);
                res.status('500').json({
                    ok: false,
                    msg: 'ERROR contact with support'
                });
            };
            //update data base with the new img
            updateImg(table, id, fileName);

            res.json({
                ok: true,
                msg: 'File uploaded!',
                fileName
            });
        });

    } catch (error) {
        res.status('500').json({
            ERROR: error
        });
    }
}

module.exports = { uploadFile }
const response = require('express');
const fs = require('fs')
const path = require('path');

const returnImg = async(req, res = response) => {

    const img = req.params.img;
    const table = req.params.table;

    let pathImg = path.join(__dirname, `../uploads/${table}/${img}`);
    if (!fs.existsSync(pathImg)) {
        pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    }
    res.sendFile(pathImg);
}

module.exports = { returnImg };
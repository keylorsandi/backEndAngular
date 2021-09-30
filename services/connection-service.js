const mongoose = require('mongoose');

const CONNECTION = process.env.DB_HOST;

const ConnectionService = async() => {

    try {

        await mongoose.connect(CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('dbOnline');
    } catch (error) {
        console.error('Error');
        throw new Error('Error al conectar con la base de datos');

    }
}

module.exports = {
    ConnectionService
}
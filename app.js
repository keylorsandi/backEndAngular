const express = require('express');
const cors = require('cors')
require('dotenv').config({ path: 'enviroments.env' });


const { ConnectionService } = require('./services/connection-service')

//crear el servidor de express
const app = express();
//configuro cors
app.use(cors());
//connection
ConnectionService();
//puerto donde va a correr mi backEnd
const PORT = process.env.PORT;
//rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'hola que hace'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} `);
});
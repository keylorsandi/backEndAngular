const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');
const authRoute = require('./routes/authRoute');
const hospitalRoutes = require('./routes/hospitalRoutes');
const medicRoutes = require('./routes/medicRoutes');
const searcherRoute = require('./routes/searcherRoute');
const uploadfilesRoute = require('./routes/uploadfilesRoute');
require('dotenv').config({ path: 'enviroments.env' });


const { ConnectionService } = require('./services/connection-service');

//puerto donde va a correr mi backEnd
const PORT = process.env.PORT;

//crear el servidor de express
const app = express();

//configuro cors
app.use(cors());

//lectura y parseo del body
app.use(express.json());

//connection
ConnectionService();

//Public
app.use(express.static('public'));



//rutas
app.use('/api/users', userRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/medics', medicRoutes);
app.use('/api/login', authRoute);
app.use('/api/search', searcherRoute);
app.use('/api/uploadfile', uploadfilesRoute);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} `);
});
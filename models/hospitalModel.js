const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

    name: {
        type: String,
        require: true
    },
    img: {
        type: String,
    },
    state: {
        type: Boolean,
        default: true
    },
    userID: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, { collection: 'hospitals' });

//configuracion en el schema para cambiar nombres de prropiedades
HospitalSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.hid = _id;
    return object
})

module.exports = model('Hospital', HospitalSchema);
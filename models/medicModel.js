const { Schema, model } = require('mongoose');

const MedicSchema = Schema({

    name: {
        type: String,
        require: true
    },
    lastName: {
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
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    hospitalID: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        require: true
    }


});

//configuracion en el schema para cambiar nombres de prropiedades
MedicSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;
    return object
})

module.exports = model('Medic', MedicSchema);
const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
    state: {
        type: Boolean,
        default: true
    }
});

//configuracion en el schema para cambiar nombres de prropiedades
UserSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();

    object.uId = _id;
    return object
})

module.exports = model('User', UserSchema);
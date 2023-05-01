const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    surname: {
        type: String,
    },
    bio: {
        type: String,
    },
    nick: {
        type: String,
        unique: true,
        required: [true, 'El nick es obligatorio'],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es obligatorio'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        trim: true
    },
    role: {
        type: String,
        default: 'ROLE_USER',
        trim: true
    },
    image: {
        type: String,
        default: "default.png",
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('User', UserSchema, "users");

    
const mongoose = require('mongoose');
const AlertScheme = new mongoose.Schema({
    id: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    machine: {
        required: true,
        type: String
    },
    is_read: {
        required: true,
        type: Boolean,
        default: false
    },
    type: {
        required: true,
        type: String
    },
})

module.exports = mongoose.model('alert', AlertScheme)
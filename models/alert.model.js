const mongoose = require('mongoose');
const AlertScheme = new mongoose.Schema({
    alertNumber: {
        required: true,
        type: String
    },
    timestamp: {
        required: true,
        type: String
    },
    machine: {
        required: true,
        type: String
    },
    anomaly: {
        required: true,
        type: String
    },
    sensor: {
        required: true,
        type: String,
    },
    soundClip: {
        required: true,
        type: String
    },
    suspectedReason: {
        type: String,
        default: "Unknown Anomaly"
    },
    actionRequired: {
        type: String,
        default: null,
    },
    isRead: {
        required: true,
        type: Boolean,
        default: false
    },
    comment: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('alert', AlertScheme)
const express = require('express');
const AlertModel = require('../models/alert.model');
const router = express.Router();

router.get('/alert', async (req, res) => {
    try {
        const { machine } = req.query;
        let payload = {}
        if (typeof machine !== 'undefined' && machine !== '') payload.machine = machine
        const data = await AlertModel.find(payload);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/alert', async (req, res) => {
    const payload = req.body

    const generateRandomNumber = (length) => {
        let result = '';
        const characters = '0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }
    const data = new AlertModel({
        alertNumber: generateRandomNumber(16),
        timestamp: payload.timestamp,
        machine: payload.machine,
        anomaly: payload.anomaly,
        sensor: payload.sensor,
        soundClip: payload.soundClip,
        suspectedReason: payload.suspectedReason || '',
        isRead: false
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/alert/:id', async (req, res) => {
    try {
        const data = await AlertModel.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/getMachineList', async (req, res) => {
    try {
        const data = await AlertModel.find().distinct('machine')
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/alert/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const payload = req.body;

        const result = await AlertModel.findByIdAndUpdate(
            id, {
            suspectedReason: payload.suspectedReason,
            actionRequired: payload.actionRequired,
            comment: payload.comment,
            isRead: true
        })
        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;
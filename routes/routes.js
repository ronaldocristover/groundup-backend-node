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
    const { id, name, description, type, machine } = req.body

    const data = new AlertModel({
        id: id,
        name: name,
        description: description,
        type: type,
        machine: machine,
        is_read: false
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

//Update by ID Method
router.get('/alert/markAsRead/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Model.findByIdAndUpdate(
            id, {
            is_read: true
        })
        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;
const { Device } = require('../models/device');
const express = require('express');
const router = express.Router();

router.get(`/`, async(req, res) => {
    // filter if there is param status in the query
    let filter = {};
    const deviceList = await Device.find(filter);
    if (req.query.status) {
        filter = { status: req.query.status.split(',') };
        deviceList = await Device.find(filter);
    }

    if (!deviceList) {
        res.status(500).json({ success: false });
    }

    res.send(deviceList);
});

router.get(`/:id`, async(req, res) => {
    const device = await Device.findById(req.params.id);
    if (!device) {
        return res.status(500).send('Device cannot be found!');
    }
    return res.send(device);
});

router.post(`/`, async(req, res) => {
    let device = new Device({
        code: req.body.code,
        photo_work_time: req.body.photo_work_time,
        print_price: req.body.print_price,
        product_price: req.body.product_price,
        contact_number_for_failure: req.body.contact_number_for_failure,
        status: req.body.status,
    });

    device = await device.save();

    if (!device) {
        return res.status(404).send('Device cannot be created!');
    }
    return res.send(device);
});

module.exports = router;
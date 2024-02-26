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
        name: req.body.name,
        number: req.body.number,
        photo_shooting_time: req.body.photo_shooting_time,
        photo_suffer_time: req.body.photo_suffer_time,
        store_id: req.body.store_id,
        photo_work_time: req.body.photo_work_time,
        print_price: req.body.print_price,
        product_price: req.body.product_price,
        contact_number_for_device_failure: req.body.contact_number_for_device_failure,
        status: req.body.status,        
    });

    device = await device.save();

    if (!device) {
        return res.status(404).send('Device cannot be created!');
    }
    return res.send(device);
});

router.delete('/:id', async (req, res) => {    
    const device = await Device.deleteOne({_id: req.params.id});    
    if (device) {
        return res.status(200).json({success: true, message: 'the device is deleted!'})
    } else {
        return res.status(404).json({success: false, message: 'device cannot be found!'})
    }  
});



module.exports = router;
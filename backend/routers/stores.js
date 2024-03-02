const { Store } = require('../models/store');
const express = require('express');
const router = express.Router();

router.get(`/`, async(req, res) => {
    const storeList = await Store.find();
    if (!storeList) {
        res.status(500).send('Store cannot be found!');
    }
    res.send(storeList);
});

router.get(`/:id`, async(req, res) => {
    const store = await Store.findById(req.params.id);
    if (!store) {
        return res.status(500).send('Store cannot be found!');
    }
});

router.post(`/`, async(req, res) => {
    let store = new Store({
        code: req.body.code,
        name: req.body.name,
        address: req.body.address,
        is_active: req.body.is_active,
    });

    store = await store.save();

    if (!store) {
        return res.status(404).send('Store cannot be created!');
    }
    return res.send(store);
});

module.exports = router;
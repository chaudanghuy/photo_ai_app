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
})
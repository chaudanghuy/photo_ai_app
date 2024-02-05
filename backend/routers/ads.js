const { Ad } = require('../models/ad');
const express = require('express');
const router = express.Router();

router.get(`/`, async(req, res) => {
    const adList = await Ad.find();
    if (!adList) {
        res.status(500).json({ success: false });
    }
    res.send(adList);
});

router.post(`/`, (req, res) => {
    const ad = new Ad({
        title: req.body.title,
        budget: req.body.budget,
        status: req.body.status,
        image: req.body.image,
    });
    ad.save().then((createdAd => {
        res.status(201).json(createdAd);
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false,
        })
    });
});

module.exports = router;
const { Account } = require('../models/account');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get(`/`, async(req, res) => {
    const accountList = await Account.find().select('-password');
    if (!accountList) {
        res.status(500).send('Account cannot be found!');
    }

    res.send(accountList);
});

router.get(`/:id`, async(req, res) => {
    const account = await Account.findById(req.params.id).select('-password');
    if (!account) {
        res.status(500).send('Account cannot be found!');
    }

    res.send(account);
});

router.post('/login', async(req, res) => {
    const account = await Account.findOne({ email: req.body.email });
    const secret = process.env.SECRET_KEY;

    if (!account) {
        return res.status(400).send('The user not found');
    }

    if (account && bcrypt.compareSync(req.body.password, account.password)) {
        const token = jwt.sign({
                accountId: account.id,
                isAdmin: account.role === 'admin'
            },
            secret, { expiresIn: '1d' }
        );
        res.status(200).json({
            account: account.email,
            token: token
        });
    } else {
        res.status(400).send('The password is wrong');
    }
})

router.post(`/`, async(req, res) => {
    let account = new Account({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        role: req.body.role,
        is_active: req.body.is_active,
    });

    account = await account.save();
    if (!account) {
        res.status(404).send('Account cannot be created!');
    }

    res.send(account);
});

module.exports = router;
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vote = require('../model/Vote');

const Pusher = require('pusher');


var pusher = new Pusher({
    appId: "476907",
    key: "3adc482f40aa78d9b20f",
    secret: "c33552bf30d93490ced1",
    cluster: "us2",
    encrypted: true
});

router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({ success: true, votes: votes }));
});

router.post('/', (req, res) => {
    const newVote = {
        os: req.body.os,
        points: 1
    };
    new Vote(newVote).save().then(vote => {
        pusher.trigger("os-poll", "os-vote", {
            points: parseInt(vote.points),
            os: vote.os
        });

        return res.json({
            success: true,
            message: "Thank you for voting"
        });

    });

});

module.exports = router;
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require('../middleware/check-auth');
const Settings = require("../models/settings");


router.get("/",(req, res, next) => {
  Settings.find()
  .select()
  .exec()
  .then(docs => {
    const response = {
        settings:
        docs.map(doc => {
          return {
           
            distance: doc.distance,
            offlineTime: doc.offlineTime,
            price: doc.price,
            tDay: doc.tDay,
            tIdle: doc.tIdle,
            tNight: doc.tNight,
            tCall: doc.tCall
            };
        })
    };
    if (docs.length >= 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json({
        message: 'No entries found'
      });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

router.patch("/", checkAuth, (req, res, next) => {
  const id = '5cf66921be496d2fdb238b3f';
  const updateOps = {};


  Settings.update({ _id: id }, { $set: req.body })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Settins updated',
     
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require('../middleware/check-auth');

const Addreses = require("../models/addreses");

router.get("/", (req, res, next) => {

    res.status(400).json({
        message: 'Ok 123'
      });
})

router.post("/", (req, res, next) => {
    let loc= req.body.lat.toString() + "-" + req.body.lng.toString()
    Addreses.find ({ locaton: loc })
        .exec()
        .then(address => {
            if (address.length >=1 ){
                return res.status(409).json({
                    message: "Address exists"
                })
            } else {
                const address = new Addreses ({
                    _id: new mongoose.Types.ObjectId(),
                    lat: req.body.lat,
                    lng: req.body.lng,
                    locaton: loc,
                    address: req.body.address
                });
                address
                    .save()
                    .then( address => {
                        res.status(201).json({
                            message: "Address created"
                          });
                    })
                    .catch( err => {
                        console.log(err);
                        res.status(500).json({
                          error: err,
                          address: address
                        });
                    })
                        
                    
            }
        })
})

module.exports = router;
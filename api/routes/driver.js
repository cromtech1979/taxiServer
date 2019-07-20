const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require('../middleware/check-auth');
const Driver = require("../models/driver");
const User = require("../models/user");
const googleOauthDriver = require("../oauth/googleOauthDriver")
const geolib = require('geolib');

//TODO need secure
router.get("/", (req, res, next) => {
  Driver.find()
    .select()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        drivers: docs
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
router.post("/near", checkAuth,(req, res) => {
  let drv = []
  //drv[0] = "sdsdsd"
 // drv[1] ={ one: "sdfsdfds"}
  // if (  req.body.lat  &&  req.body.lng) {
  //   let cLat = req.body.lat
  // let cLng = req.body.lng
  // } else {
  //   res.status(200).json({
  //     message: "Error request"
  //   })
  // }
  const date = new Date();
  let tarif; 
  Driver.find()
  .select('_id name latitude longitude urlImage carModel carMark regNumber phoneNumber urlImage tDay tNight')
  .exec()
  .then(
    driver => {
   
      for (let i = 0; i < driver.length; i++) {
        if (date.getHours() > 18 && date.getHours() < 6 ){
          tarif= driver[i].tNight
        } else {
          tarif= driver[i].tDay
        }

      let cdist =   geolib.getDistance(
          { latitude:  parseFloat( req.body.lat) , longitude:  parseFloat( req.body.lng) },
          { latitude: parseFloat( driver[i].latitude), longitude: parseFloat (driver[i].longitude)}, 1000)
          console.log ("Dist " + cdist)
      drv[i] = { 
        name : driver[i].name,
        lng : driver[i].longitude,
        carModel:driver[i].carModel,
        carMark:driver[i].carMark,
        regNumber:driver[i].regNumber,
        phoneNumber:driver[i].phoneNumber,
        urlImage:driver[i].urlImage,
        lat: driver[i].latitude,
        dist: cdist,
        time: (cdist /40) * 60,
        tDay: driver[i].tDay,
        tNight: driver[i].tNight,
        tarif: tarif,
        hour: date.getHours()
      
      }
        
      }
      drv.sort (function(a, b){
        return a.time > b.time;
      });
      res.status(200).json({
        drivers: drv.slice(0,3) //Need 3
      })
      })
    
 
  // res.status(200).json({
  //   message: drv
  // })
})

router.post("/signup", (req, res, next) => {

  Driver.find({ email: req.body.email })
    .exec()
    .then(driver => {
      if (driver.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const driver = new Driver({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              googleToken: req.body.googleToken,
              status: true,
              regDate: Date.now()
            });
            driver
              .save()
              .then(result => {
                googleOauthDriver.googleCheck(req.body.googleToken)
                console.log(result);
                res.status(201).json({
                  message: "driver created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});


router.get("/:userId", (req, res) => {
  const id = req.params.userId
  Driver.findById(id)
    .select()
    .exec()
    .then(doc => {
      if (doc) {

        res.status(200).json({
          driver: doc,

        })
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found User ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
})
router.patch("/:driverId", (req, res, next) => {
  const id = req.params.driverId;
  // const updateOps = {};
  // for (const ops of req.body) {
  //   updateOps[ops.propName] = ops.value;
  // }
  // console.log(updateOps)
  Driver.update({ _id: id }, { $set: req.body })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Driver updated',

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

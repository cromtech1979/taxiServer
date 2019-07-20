const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require('../middleware/check-auth');
const User = require("../models/user");
const googleOauth = require("../oauth/googleOauth")

router.get("/:userId", (req, res) => {
  const id = req.params.userId
  User.findById(id)
    .select('email status name urlImage regDate')
    .exec()
    .then(doc => {
      if (doc) {

        res.status(200).json({
          user: doc,

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

router.post("/signup", (req, res, next) => {

  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
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
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              googleToken: req.body.googleToken,
              status: true,
              regDate: Date.now()
            });
            user
              .save()
              .then(result => {
                googleOauth.googleCheck(req.body.googleToken)
                console.log(result);
                res.status(201).json({
                  message: "User created"
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

router.post("/login", (req, res, next) => {
  console.log(req.body)
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id

            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            user: user[0].email,
            token: token,
            id: user[0]._id
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:userId",checkAuth ,(req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// router.get("/", (req, res ) => {

//     res.status(200).json({
//       username: "Crom",
//       userId: 124,
//       id: 4567

//     })
// })
// Set coordinates
router.patch("/cord", checkAuth, (req, res, next) => {
  const user = req.params.id


  User.update({ _id: req.body.id }, {
    latitude: req.body.latitude,
    longitude: req.body.longitude
  }).exec()
    .then(result => {
      res.status(200).json({
        id: req.body.id,
        latitude: req.body.latitude,
        longitude: req.body.longitude
      })
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })

})

router.post("/drivers", checkAuth, (req, res, next) => {
  console.log(res)
  User.find( {role: "driver"})
    .select("longitude latitude name _id")
    .exec()
    .then(docs => {
      const response = {
          drivers:
          docs.map(doc => {
            return {
              _id: doc._id,
              name: doc.name,
              longitude: doc.longitude,
              latitude: doc.latitude
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
        error: "Opsss!"
      });
    });
})

router.get("/", checkAuth, (req, res, next) => {
  User.find({'role': 'client'})
    .select("email _id name urlImage regDate role")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        users:
          docs.map(doc => {
            return {
              email: doc.email,
              _id: doc._id,
              name: doc.name,
              urlImage: doc.urlImage,
              regDate: doc.regDate,
              role: doc.role
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

module.exports = router;

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require('../middleware/check-auth');
const User = require("../models/user");
const googleOauth = require("../oauth/googleOauth")


router.get("/", (req, res, next) => {
   res.send(200).json({
       message: "Mashala"
   })
  });
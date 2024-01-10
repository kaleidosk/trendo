const express = require('express');
const router = express.Router();
const User = require("../models/User.model");
const Item = require("../models/Item.model");

/* GET home page */
router.get("/", (req, res, next) => {
//  res.render("index");
// });

Item.find()
      .then(allItems => {
     res.render('index', {items: allItems})
      })
    })

module.exports = router;

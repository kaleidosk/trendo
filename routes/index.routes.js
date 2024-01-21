const express = require('express');
const router = express.Router();
const User = require("../models/User.model");
const Item = require("../models/Item.model");

/* GET home page */
router.get("/", (req, res, next) => {
//  res.render("index");
// });

/*Display the available items*/

Item.find({ borrowerId: null })  // Filtrar los items con borrowerId igual a null
    .then(availableItems => {
      res.render('index', { items: availableItems });
    })})

module.exports = router;

/*Display the rented items*/
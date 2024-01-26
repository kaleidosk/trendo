const express = require('express');
const router = express.Router();
const User = require("../models/User.model");
const Item = require("../models/Item.model");

/* GET home page */
router.get("/", async (req, res, next) => {
  try {
    // Consultar ítems sin borrowerId
    const items = await Item.find({ borrowerId: null });

    // Consultar ítems con borrowerId
    const itemsRented = await Item.find({ borrowerId: { $ne: null } });

    if (req.session.currentUser) {
      // Usuario autenticado
      res.render('index', {
        items: items,
        itemsRented: itemsRented,
        loggedIn: true,
        user: req.session.currentUser
      });
    } else {
      // Usuario no autenticado
      res.render('index', {
        items: items,
        itemsRented: itemsRented
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const User = require("../models/User.model");
const Item = require("../models/Item.model");
const fileUploader = require('../config/cloudinary.config');
//const {isLoggedIn} = require('../middleware/isLoggedIn');


// **********************************
// GET route to display the form to create a new item
// localhost:3000/item-create

router.get("/item-create", (req, res) => {
    console.log('req.session.currentUser',req.session.currentUser)
    console.log('req.session.currentUser._id',req.session.currentUser._id)
User.findById(req.session.currentUser._id)
  .then((dbUser) => {
  res.render("items/create", { dbUser });
    })
     .catch((err) => console.log(`Err while displaying post input page: ${err}`));
 });
 
// ************************************************
// POST route to submit the form to create a new item
// <form action="/item-create" method="POST">

router.post("/item-create",fileUploader.single('itemImage'),(req, res) => {
    const { name, description} = req.body;
    console.log('req.file',req.file)
    Item.create({name, description,imageUrl: req.file.path,ownerId:req.session.currentUser._id}) //1. Create a new Item 
    .then(dbItem => {
      // when the new item is created, the user needs to be found and its item updated with the
      // ID of newly created item
      return User.findByIdAndUpdate(req.session.currentUser._id, { $push: { createdItems: dbItem._id } }); 
    })

    //3. Redirect to a different page
    .then (() => res.redirect (`/profile/${req.session.currentUser.username}`))
    .catch(err => {
      console.log(`Err while creating the post in the DB: ${err}`);
      next(err);
    });
  })
  

module.exports = router;
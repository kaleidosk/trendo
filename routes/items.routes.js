const express = require('express');
const router = express.Router();
const User = require("../models/User.model");
const Item = require("../models/Item.model");

//************************************ HELP PLEASE ****************************
//const {isLoggedIn, isLoggedOut} = require('../middlewares/route-guard');
// I want to protect the route with the middleware "Loggedin", but I get the error: it is not defined


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
 //************HELP PLEASE line 19-24, I'm passing all the Users because I don't how to fill the 
 //label owner field only with the current user and how I show the items?*******/
//.then(() => {
  //res.render("items/create", req.session.currentUser);   
//})
// .catch((err) => console.log(`Err while displaying post input page: ${err}`));
//});


// ****************************************************************************************
// POST route to submit the form to create a new item
// <form action="/item-create" method="POST">

router.post("/item-create",(req, res) => {
    const { name, description,image,owner} = req.body;
    console.log('owner', owner)
    Item.create({name, description,image,owner:req.session.currentUser}) //1. Create a new Item 
    .then(dbItem => {
      // when the new item is created, the user needs to be found and its item updated with the
      // ID of newly created item
      return User.findByIdAndUpdate(owner, { $push: { items: dbItem._id } }); 
      //borralo e vay a redirect
    })


    // User.findById({user:owner})
    // .populate ('items')
   

    .then(() => res.redirect ('/profile'))//3. Redirect to a different page
    //res.render("auth/profile/:username", foundUser);
  //res.redirect('/login/:${user.username}')
    .catch(err => {
      console.log(`Err while creating the post in the DB: ${err}`);
      next(err);
    });
  })
  

module.exports = router;
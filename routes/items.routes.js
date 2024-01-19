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
    const {name,description,price,category} = req.body;
    console.log('req.file',req.file)
    Item.create({name, description,price,category,imageUrl: req.file.path,ownerId:req.session.currentUser._id}) //1. Create a new Item 
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
  
  //GET route to the item detail page
  router.get('/items/:itemId', (req, res)=>{
    const {itemId} = req.params;
  
    Item.findById(itemId)
        .populate('ownerId')
        .then((item)=>{
          console.log('item',item)
          res.render('items/details',item)   
        })
  })

  //GET route to the item edit page
  router.get('/items/:itemId/edit', (req, res) => {
    const {itemId} = req.params;
    Item.findById(itemId)
      .then(item => res.render('items/edit', item))
      .catch(error => console.log(`Error while getting an item for edit: ${error}`));
  });

  
// POST route to save changes after updating the item
router.post('/items/:itemId/edit', fileUploader.single('itemImage'), (req, res) => {
  const { itemId } = req.params;
  const { name,description, price,category } = req.body;
 
  let imageUrl;
  if (req.file) {
    imageUrl = req.file.path;
  } else {
    imageUrl = existingImage;
  }
 
  Item.findByIdAndUpdate(id, { name, description, price,category }, { new: true })
    .then(() => res.redirect('/items/:itemId'))
    .catch(error => console.log(`Error while updating a single movie: ${error}`));
});


//POST route to delete an item
router.post('/items/:itemId/delete', (req,res)=>{
const {itemId} =req.params;
console.log ('itemId',itemId)
Item.findByIdAndDelete (itemId)
.then (()=> res.redirect (`/profile/${req.session.currentUser.username}`))
console.log('req.session.currentUser.username',req.session.currentUser.username)
.catch (err => console.log('error while deleting the item'))
})


//GET route to rent an item
router.get ('/items/:itemId/rent',(req,res,next)=>{
  const {itemId} = req.params;
  Item.findById(itemId)
  //1. remove the item from the array of his ownerId
  .then(foundItem=> {
    console.log ('foundItem remove the item',foundItem)
return User.findByIdAndUpdate({_id:foundItem.ownerId}, { $pull: { createdItems:foundItem._id } })
 })
  //2. push the item in the borrowedItems of the user loggedIn
  
  Item.findById(itemId)
     .then(foundItem=> {
      console.log ('foundItem',foundItem)
return User.findByIdAndUpdate({_id:req.session.currentUser._id}, { $push: { borrowedItems:foundItem._id } }
  )
  })

//3. Add borrowerId to the item
Item.findById(itemId)
     .then(foundItem=> {
      console.log ('foundItem n.3',foundItem)
return Item.findByIdAndUpdate(itemId,{borrowerId:req.session.currentUser._id})
     })
  

  //4. redirect to the profile page of the loggedin user and pass the added item to show it in .hbs
.then (()=> { 
 res.render ('auth/profile',{user:req.session.currentUser})})
   })
    



module.exports = router;
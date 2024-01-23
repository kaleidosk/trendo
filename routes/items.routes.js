const express = require('express');
const router = express.Router();
const User = require("../models/User.model");
const Item = require("../models/Item.model");
const fileUploader = require('../config/cloudinary.config');
const Comment = require('../models/Comment.model');
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
    Item.create({name, description,price,category,imageUrl: req.file.path,ownerId:req.session.currentUser._id}) 
    //1. Create a new Item 
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
  // router.get('/items/:itemId', (req, res)=>{
  //   const {itemId} = req.params;
  // let item = null
  //   Item.findById(itemId)
  //       .populate('ownerId')
  //       .then((foundItem)=>{
  //         item = foundItem
  //         console.log('foundItem',foundItem )
  //       })
  //       .then (()=>{
  //       Comment.find({itemCommentId:itemId})
  //         .populate ('commenterId')
  //         .then ((allComments)=> {
  //           console.log('allComments',allComments)
  //           res.render('items/details',{allComments,item,loggedIn: true, user: req.session.currentUser})   
  //         })
  //       })  
  //       })

  //2GET route to the item detail page
  router.get('/items/:itemId', async (req, res) => {
    try {
      const { itemId } = req.params;
      const foundItem = await Item.findById(itemId).populate('ownerId');
      
      if (!foundItem) {
        return res.status(404).send('Item not found');
      }
      const allComments = await Comment.find({ itemCommentId: itemId }).populate('commenterId');
      const isItemOwner = req.session.currentUser ? foundItem.ownerId._id.equals(req.session.currentUser._id) : false;
  
      res.render('items/details', { allComments, item: foundItem, loggedIn: req.session.currentUser ? true : false ,isItemOwner,user: req.session.currentUser });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

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

  //4. redirect to the profile page of the loggedin user
.then (()=> { 
 //
 res.redirect (`/profile/${req.session.currentUser.username}`)
})
   })
    

//POST ROUTE TO RETURN THE ITEM
router.post('/items/:itemId/return', (req,res)=>{
  const {itemId} =req.params;
  console.log ('itemId',itemId)
  Item.findById(itemId)

  //1. Show the page
  //1.remove the item from the array of his borrower
  .then(foundItem=> {
return User.findByIdAndUpdate({_id:req.session.currentUser._id},{ $pull: { borrowedItems:foundItem._id } })
 })
  //2. push the item in the createdItems of the owner
  Item.findById(itemId)
     .then(foundItem=> {
      console.log ('foundItem',foundItem)    
return User.findByIdAndUpdate({_id: foundItem.ownerId}, { $push: { createdItems:foundItem._id } }
  //console.log ("foundItem.ownerId",foundItem.ownerId)
  )
  })
//3. Remove borrowerId from the item
Item.findById(itemId)
     .then(foundItem=> {
      console.log ('foundItem n.3',foundItem)
return Item.findByIdAndUpdate(itemId,{borrowerId:null})
     })

  //4. redirect to the profile page of the loggedin user

  .then (()=> res.redirect (`/profile/${req.session.currentUser.username}`))
  .catch (err => console.log('error while returning the item'))
  })





module.exports = router;
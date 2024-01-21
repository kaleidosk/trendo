const express = require('express');
const router = express.Router();
const User = require("../models/User.model");
const Item = require("../models/Item.model");
const Comment = require("../models/Comment.model");

//GET route to show the form to create a new comment
router.get("/:itemId/comments-create", (req, res) => {
    console.log('req.session.currentUser',req.session.currentUser)
    console.log('req.session.currentUser._id',req.session.currentUser._id)
    const {itemId} = req.params; 
Item.findById(itemId)
  .then((dbItem) => {
  res.render("comments/create-com", { dbItem });
    })
     .catch((err) => console.log(`Err while displaying post input page: ${err}`));
 });
 
//POST route to show the form
router.post("/:itemId/comments-create",(req, res) => {
    const {itemId} = req.params;
    console.log('itemId',itemId)
    console.log('text:req.body.text',req.body.text)
Comment.create({text:req.body.text,commenterId:req.session.currentUser._id,itemCommentId:itemId}) 
    .then(dbComment => {
console.log('dbComment', dbComment)
      return Item.findByIdAndUpdate(itemId, { $push: {comments:dbComment._id } });
    })
//redirect to the detail page of the Item
.then (() => res.redirect (`/items/${itemId}`))

.catch(err => {
  console.log(`Err while creating the comment in the DB: ${err}`);
  next(err);
});
})

module.exports = router;
// git 

//GET route to show the form to create a new comment
// router.get("/:itemId/comments-create", (req, res) => {
//     console.log('req.session.currentUser',req.session.currentUser)
//     console.log('req.session.currentUser._id',req.session.currentUser._id)
// User.findById(req.session.currentUser._id)
//   .then((dbUser) => {
//   res.render("/comments/create-com", { dbUser });
//     })
//      .catch((err) => console.log(`Err while displaying post input page: ${err}`));
//  });
 
// //POST route to show the form
// router.post("/:itemId/comments-create",(req, res) => {
//     const {itemId} = req.params;
//     const {text} = req.body;
//     Comment.create({text,commenterId:req.session.currentUser._id}) 
//     //1. Create the new Comment
//     .then(dbComment => {
//       // when the new comment is created, the item needs to be found and its detail updated with the
// //new comment
//       return Item.findByIdAndUpdate(itemId, { $push: {comments: dbComment._id } }); 
//     })
// //redirect to the detail page of the Item
// .then (() => res.redirect (`/items/${itemId}`))


// .catch(err => {
//   console.log(`Err while creating the post in the DB: ${err}`);
//   next(err);
// });
// })
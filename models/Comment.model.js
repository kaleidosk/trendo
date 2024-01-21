const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    text: String,
    commenterId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    itemCommentId:{type: Schema.Types.ObjectId, ref: "Item", required: true}
  },
  {
    timestamps: true
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
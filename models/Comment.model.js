//body/text/idCommenter
const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    text: String,
    CommenterId: {type: Schema.Types.ObjectId, ref: "User", required: true},
  },
  {
    timestamps: true
  }
);

const Comment = model("Item", itemSchema);

module.exports = Comment;
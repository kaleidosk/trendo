const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
  {
    name: String,
    description: String,
    imageUrl:String, 

    ownerId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    borrowerId: {type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

const Item = model("Item", itemSchema);

module.exports = Item;
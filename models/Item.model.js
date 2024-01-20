const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
  {
    imageUrl:String,
    name: String,
    description: String,
    price:Number,
    category:String,
  
    ownerId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    borrowerId: {type: Schema.Types.ObjectId, ref: "User"},
    comments:[{type:Schema.Types.ObjectId, ref:'Comment'}]
  },
  {
    timestamps: true
  }
);

const Item = model("Item", itemSchema);

module.exports = Item;
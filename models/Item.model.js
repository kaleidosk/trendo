const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
  {
    name: String,
    description: String,
    image:String, 
//********HELP PLEASE********/
    owner: {type: Schema.Types.ObjectId, ref: "User" },
    client: {type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

const Item = model("Item", itemSchema);

module.exports = Item;
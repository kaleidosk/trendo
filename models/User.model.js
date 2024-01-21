const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    imageUrl:{type:String},
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    borrowedItems:[{type:Schema.Types.ObjectId, ref:'Item'}],
    createdItems:[{type:Schema.Types.ObjectId, ref:'Item'}],
    // createdComments:[{type:Schema.Types.ObjectId, ref:'Comment'}]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

// const express = require('express');
// const router = express.Router();
// const User = require("../models/User.model");
// const Item = require("../models/Item.model");
// const fileUploader = require('../config/cloudinary.config');
// const Comment = require('../models/Comment.model');
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
//https://res.cloudinary.com/ddxvju14s/image/upload/v1705755707/web-app/yzuefgmqg2cprqieftnf.jpg
//pload/v1705755733/web-app/oy7ifbovr8skblyu0jxv.jpg

// const users = [ {
//     imageUrl:`https://res.cloudinary.com/ddxvju14s/image/upload/v1705747996/web-app/fccvcapdxbbuzlftzz0g.jpg`,
//     username:'Magda',
//     email: 'magda@gmail.com',
//     const hashedPassword = await bcrypt.hash(password, saltRounds)?
//     password: hashedPassword??
// },
// password' => bcrypt(value:'auth') to 'password' => bcrypt('password')?
// 

//    {imageUrl:`https://res.cloudinary.com/ddxvju14s/image/upload/v1705606373/web-app/rigfuhlfylgsmlls6shi.jpg`,
//     username:'Dunia',
//     email: 'dunia@gmail.com',
//     password: bcrypt.hash('123456', saltRounds) how I add the ashed password?
// }]

// const Items =[{
//     imageUrl:,
//     name: ,
//     description: ,
//     price:,
//     category:,
//How I add the Id creator? I should add ItemCreate inside the User?
// ownerId: 
// }


// ]



// mongoose.connect('mongodb+srv://mjenn294:6cXeVOdD3GKlFCLq@cluster0.6widqwd.mongodb.net/web-app')
// .then(() => console.log('Connection to DB successful'))
// .then(()=> User.create(users))
// .then((allUsers) => console.log(`${allUsers.length} users were added`))
// .then(()=> mongoose.connection.close())
// .catch(err => console.log(err))
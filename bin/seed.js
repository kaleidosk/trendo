const express = require('express');
const router = express.Router();
const User = require("../models/User.model");
const Item = require("../models/Item.model");
const fileUploader = require('../config/cloudinary.config');

const User
var express = require('express');
var router = express.Router();

var UserRegi= require('../models/userRegi');



// registration details
router.post('/register',  function(req,res,next){
  addToDB(req,res);
});

async function addToDB(req,res){
    var user = new UserRegi({
      username: req.body.username,
      gender: req.body.gender,
      date_of_birth:req.body.date_of_birth,
      message: req.body.message,
      telephone:req.body.telephone,
     profession:req.body.profession,
     image:req.body.image,
  // topping:req.body.topping,

   //  creation_dt: Date.now()
    });
  


try{
    doc =await user.save();
  
      return res.status(201).json(doc);
    }
  
  catch(err){
      return res.status(501).json({err});
    }
  }

  module.exports = router;
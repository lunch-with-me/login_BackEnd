var express = require('express');
var router = express.Router();

var UserRegi= require('../models/user');



// registration details
router.post('/registerdetails',  function(req,res,next){
  addToDB(req,res);
});

async function addToDB(req,res){



//     var user = new UserRegi({
//        fullname: req.body.fullname,
//        gender: req.body.gender,
//        date_of_birth:req.body.date_of_birth,
//        message: req.body.message,
//        telephone:req.body.telephone,
//        profession:req.body.profession,
//        image:req.body.image,
//   // topping:req.body.topping,




  //  creation_dt: Date.now()
  //   });
  


try{


  
  console.log("apu data 0 - - - "+JSON.stringify(req.body))

var newdata = {
         fullname: req.body.fullname,
         gender: req.body.gender,
         date_of_birth:req.body.date_of_birth,
         message: req.body.message,
         telephone:req.body.telephone,
         profession:req.body.profession,
         image:req.body.image,
         creation_dt: Date.now()
}

  UserRegi.updateOne({email:req.body.email},newdata,{upsert: true}).then(doc=>{
    console.log("succss - "+JSON.stringify(doc))
    return res.status(201).json(doc);
  })

    
  
     
    }
  
  catch(err){
      return res.status(501).json({err});
    }
  }

  module.exports = router;
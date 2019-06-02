   var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');


router.post('/register',  function(req,res,next){
 console.log("adding email")
  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password)
    
 
  });

  let promise = user.save();

  promise.then(function(doc){
    console.log("juser created")
    return res.status(201).json(doc);
  })

  promise.catch(function(err){
    return res.status(501).json({message: 'Error registering user.'})
  })
})








router.post('/login', function(req,res,next){
   let promise = User.findOne({email:req.body.email}).exec();

   promise.then(function(doc){
    if(doc) {
      if(doc.isValid(req.body.password)){
          // generate token
          let token = jwt.sign({username:doc.username,email:doc.email},'secret', {expiresIn : '3h'});

          return res.status(200).json(token);

      } else {
        return res.status(501).json({message:' Invalid Credentials'});
      }
    }
    else {
      return res.status(501).json({message:'User email is not registered.'})
    }
   });

   promise.catch(function(err){
     return res.status(501).json({message:'Some internal error.please try again'});
   })
})


router.get('/username', verifyToken, function(req,res,next){
  //console.log(decode)
  return res.status(200).json(decodedToken.username);
})
router.get('/email', verifyToken, function(req,res,next){
 // console.log(decode)
return res.status(200).json(decodedToken.email);
})


router.get('/resetPassword/:email',function(req,res)
{
    User.findOne({email:req.params.email}).select().exec(function(err,user)
    {

      if(err) 
      {
        res.json({ sucess:false, message:err});
      }
      else{
        if(!User){
          res.json({success:false, message:'Email is not found'});
        }
        else{
          res.json({success:true , message:'vfoefjfiuei'});
        }
        else{
           var email={
             from:'Lunch with ME',
             to: user.email,
             subject:'Reset Password',
             text:'Hello'+user.username+' you have requested to reset your password'   

           };
           client.sendMail(email,function(err,info){
             if(err) console.log(err);
           })
        }

      }
    });
}
)






var decodedToken='';
function verifyToken(req,res,next){
  let token = req.query.token;

  jwt.verify(token,'secret', function(err, tokendata){
    if(err){
      return res.status(400).json({message:' Unauthorized request'});
    }
    if(tokendata){
      decodedToken = tokendata;
      next();
    }
  })
}













module.exports = router;

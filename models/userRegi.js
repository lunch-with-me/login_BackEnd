var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
  username: {type:String, require:true},
  gender: {type:String, require:true},
  date_of_birth:{type:Date, require:true},
  message:{type:String, require:true},
  telephone:{type:String},
 profession:{type:String, require:true},
 image:{type:String, require:true},
//topping:{type:String, require:true},
///creation_dt:{type:Date, require:true},

});



module.exports = mongoose.model('UserRegi',schema);
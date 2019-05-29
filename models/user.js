var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var schema = new Schema({

    username: {type:String, require:true},
    email : {type:String, require:true},
    password:{type:String, require:true},
    fullname: {type:String, require:true},
    gender: {type:String, require:true},
    date_of_birth:{type:Date, require:true},
    message:{type:String, require:true},
    telephone:{type:String},
    profession:{type:String, require:true},
    image:{type:String, require:true},
     creation_dt:{type:Date, require:true}
});

schema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

schema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('User',schema);
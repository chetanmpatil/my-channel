var mongoose=require('mongoose');
var uniquevalidator=require('mongoose-unique-validator');
var Schema=mongoose.Schema;
var schema=mongoose.Schema({
      username:{type:String},
      surname: {type:String},
      email:{type:String,require:true,unique:true},
      password:{type:String,require:true,unique:true},
      isloggedin:{type:Boolean}
});
schema.plugin(uniquevalidator);

module.exports = mongoose.model('User',schema);
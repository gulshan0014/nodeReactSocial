var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// var uniqueValidator = require('mongoose-unique-validator');

const db = require('../connection/mongoose');
const defaultSchema = require("./defaultSchema");

var userSchema = new  mongoose.Schema({
	firstName 	: {type:String, required:true},
	lastName 	: {type:String},
	email : {
		type:String, required:true, 
		unique : true,
		validate: {
			validator: function(v) {
				return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(v);
			},
			message: props => `${props.value} is not a valid email!`
		}},
	password 	: {type:String, required:true},
	bio : {type:String}
});

userSchema.plugin(defaultSchema);
userSchema.index({ email: 1, firstName: 1}, { unique: true });

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    // bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    //     if (err) return cb(err);
    //     cb(null, isMatch);
	// });
	if(candidatePassword == this.password) cb(null, true)
	else {let err="unauthorised access"; cb(err);}
};


module.exports = db.model('User', userSchema);

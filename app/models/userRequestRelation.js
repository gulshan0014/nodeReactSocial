var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const db = require('../connection/mongoose');
const defaultSchema = require("./defaultSchema");

var userRequestRelationSchema = new  mongoose.Schema({
    user1 	: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    user2 	: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    requestStatus : {type: String, enum: ["AWAIT","ACCEPTED","DECLINE","BLOCK"]},
    message : [{type: String, lowercase: true}]
});

userRequestRelationSchema.plugin(defaultSchema);
userRequestRelationSchema.index({ email: 1, firstName: 1}, { unique: true });

module.exports = db.model('UserRequestRelation', userRequestRelationSchema);

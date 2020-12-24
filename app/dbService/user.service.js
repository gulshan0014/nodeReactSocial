const User = require("../models/userModel");

async function register(data){
    try {
        let user = await User(data).save();
        return user;
    } catch (error) {
        throw error
    }
}

async function get(key, emailOrId, requied){
    try {
        let user = await User.findOne({[key]:emailOrId});
        if(user) {
            if(requied =="_doc") return user; 
            else return user._doc
        }
        return user; // user null
    } catch (error) {
        throw error
    }
}

async function verify(user,password){
    try {
        return new Promise((resolve, reject) => {
                    user.comparePassword(password, function(err, isMatch){
                        if(err) reject(err);
                        return resolve(isMatch);
                    });
                });
    } catch (error) {
        throw error
    }
}

async function addAvaibaleSlots(data){
    try {
        let user = await User(data).save();
        return user;
    } catch (error) {
        throw error
    }
}


module.exports = {
    register,
    get,
    verify,
    addAvaibaleSlots
}
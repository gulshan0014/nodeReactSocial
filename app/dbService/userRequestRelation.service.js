const UserRequestRelation = require("../models/userRequestRelation");

async function getAll(avoidEmailsInArray){
    try {
        let q = {};
        if(avoidEmailsInArray && avoidEmailsInArray.length) q["_id"] = { $nin: avoidEmailsInArray };
        let users = await User.find(q);
        
        return users;
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAll
}
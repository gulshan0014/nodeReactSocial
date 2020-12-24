const { RequestHandle :{handleResponse, handleError} } = require("../utilities");
const {
    UserRequestRelation : { getAll : getAllUsers}
} = require("../dbService/index");
const { jwtSecret, errorCode } = require("../config");

var jwt = require('jsonwebtoken');

async function getAll(req,res){
    try {
        
        let data = await getAllUsers([req.user.email]);
        
        handleResponse({res, data})
    } catch (error) {
        handleError({res, error})
    }
}



module.exports = {
    getAll
}
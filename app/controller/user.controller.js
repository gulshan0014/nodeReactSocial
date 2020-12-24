const { RequestHandle :{handleResponse, handleError} } = require("../utilities");
const {
    User:{register: userRegister, get, verify}
} = require("../dbService/index");
const { jwtSecret, errorCode } = require("../config");

var jwt = require('jsonwebtoken');



async function login(req,res, next){
    try {

        let {email, password} = req.body;
        if(!(email||password)) throw errorCode["400"]
        
        let unauthorised = errorCode["401"];

        let user = await get("email", email, "_doc");
        if(!user ||user.isDeleted) throw unauthorised
        
        let verified = await verify(user, password);
        if(verified){
            user.password = null;
            req.user = (user._doc||user);
            next();
        }else{
            throw unauthorised
        }

    } catch (error) {
        handleError({res, error})
    }
}

async function register({body:{email, firstName, lastName, password }},res){
    try {

        if(!(email || firstName|| lastName|| password)) throw errorCode["400"]

        let data = await userRegister({ email, firstName, lastName, password }); //need to encyrt the password
        
        handleResponse({res, data})
    } catch (error) {
        handleError({res, error})
    }
}

async function addToken(req,res){
    try {
        let user = req.user;
        let token = await jwt.sign({email: user.email, firstName:user.firstName, userId: user._id }, jwtSecret,{ expiresIn: '2h' });
    
        handleResponse({res, data:{...user, token}})
    } catch (error) {
        handleError({res, error})
    }
}

async function getAll(req,res){
    try {
        
        let data = await getAllUsers();
        
        handleResponse({res, data})
    } catch (error) {
        handleError({res, error})
    }
}

async function sendRequest(req,res){
    try {
        if(!(email || firstName|| lastName|| password)) throw errorCode["400"]

        let data = await userRegister({ email, firstName, lastName, password });
        
        handleResponse({res, data})
    } catch (error) {
        handleError({res, error})
    }
}


module.exports = {
    login,
    register,
    addToken,
    getAll,
    sendRequest
}
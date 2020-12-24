var jwt = require('jsonwebtoken');
const { RequestHandle :{handleError} } = require("../utilities");
const { jwtSecret, errorCode } = require("../config");
const {
    User:{ get }
} = require("../dbService/index");
const appURI = "/api/v1";
const skipUrls = [
    '/user/login', 
	'/user/register'
];


exports.isAuthenticated = async function (req, res, next) {
	try {
        const url = req.url.replace(appURI, "").split("?")[0];
        let token = req.headers['authorization']
        if (skipUrls.indexOf(url) != -1) return next();
    
		let user = await jwt.verify(token, jwtSecret);
		let userExists = await get("_id", user.userId);
		if (!userExists && !userExists.isDeleted) throw errorCode["401"]
		req.user = userExists;
		next();
	}
	catch (error) {
		handleError({ res, error })
	}
}
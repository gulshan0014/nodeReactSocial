
const User = require("./user.route");

const {isAuthenticated} = require("../utilities/auth");

module.exports = (router) => {
    
    router.get('/',function(req,res){
        res.render("index", {"title" : "GULSHAN KUMAR"});
    });

    
    router.use(isAuthenticated);
    router.use('/user', User);
  
    return router;
}
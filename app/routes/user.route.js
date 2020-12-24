const router = require("express").Router();
const {
    User:{register, login, addToken, getAll, sendRequest}
} = require("../controller/index");

router.post("/register", register);
router.post("/login", login, addToken);
router.get('/all', getAll);
router.get('/send-request', sendRequest);


module.exports = router;
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authVerify = async(req, res, next) => {
    try{
        const token = req.header("token")
        jwt.verify(token, process.env.JWTSECRETKEY, async (err, data) => {
            if(err){
                return res.json({status: false, message: err.message});
            }
            const user = await User.findById(data.id);
            if(!user) return res.json({status: false, message: "User doesn't exist"});
            req.user = user;
            next();
        })
    }catch(e){
        res.send({status: false, message: typeof(e) == "object" ? e.message : e});
    }
}

module.exports = authVerify;
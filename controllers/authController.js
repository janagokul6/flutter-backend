const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
    try{
        const {firstName, lastName, email, dob, countryCode, phone, password} = req.body;
        const hashedPassword = await bcryptjs.hash(password, 8);
        await User.create({
            firstName,
            lastName,
            email,
            dob,
            countryCode,
            phone,
            password: hashedPassword,
        });
        res.json({status: true, message: "User Registered Successfully! Now Login with credentials"});
    }catch(e){
        res.send({status: false, message: typeof(e) == "object" ? e.message : e});
    }
}

exports.signIn = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.json({status: false, message: "User doesn't exist"});
        const match = await bcryptjs.compare(password, user.password);
        if(!match) return res.json({status: false, message: "Incorrect Password"});

        const token = jwt.sign({id: user._id}, process.env.JWTSECRETKEY);

        res.json({status: true, message: "Login Successfully", data: user, token: token});
    }catch(e){
        console.log(e);
        
        res.send({status: false, message: typeof(e) == "object" ? e.message : e});
    }
}

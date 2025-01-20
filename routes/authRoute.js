const express = require("express");
const authRouter = express.Router();

const {signUp, signIn} = require("../controllers/authController");

authRouter.post("/sign_up", signUp);
authRouter.post("/sign_in", signIn);

module.exports = authRouter;
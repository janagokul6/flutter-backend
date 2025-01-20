const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config("./.env");
const app = express();
const port = process.env.PORT || 3000;
const connectDatabase = require("./database");
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
connectDatabase();

app.use(express.json());
app.use(express.static(__dirname));
app.use(cors());

app.get('/', async(req, res)=>{
    res.send("Backend running");
    
})

app.use("/auth", authRouter);
app.use("/product", productRouter);

app.listen(port, ()=> {
    console.log(`listening on ${port}`);
})
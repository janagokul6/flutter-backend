const mongoose = require("mongoose");

const connectDatabase = async ()=>{
    await mongoose.connect(process.env.MONGOURI, {
        dbName: "assignment"
    })
}

module.exports = connectDatabase;
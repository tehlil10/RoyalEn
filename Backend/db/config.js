const mongoose = require("mongoose");
const { dbURL } = require("../app/constant/constant");

const connectDB = async () => {
    try{
        await mongoose.connect(dbURL.database);
        console.log("MongoDB Connected");
    }catch (err){
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB ;
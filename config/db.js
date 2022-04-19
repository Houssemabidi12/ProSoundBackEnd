const mongoose = require("mongoose");


const connectDB = async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser : true,
        UseUnifiedTopology : true,
    });

    console.log("Mongodb Connected");

  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;


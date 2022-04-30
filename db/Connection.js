const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const con = mongoose.connect(process.env.LOCAL_MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is connected" + con);
  } catch (error) {
    console.log(`Error:${error.message}`);
    process.exit();
  }
};
module.exports = connectDB;

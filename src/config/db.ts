export {};
const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log(
      colors.cyan.underline.bold(`MongoDB Connected: ${conn.connection.host}`)
    );
  } catch (err) {
    colors.red(console.log(`Error: ${err.message}`));
    process.exit(1);
  }
};

module.exports = connectDB;

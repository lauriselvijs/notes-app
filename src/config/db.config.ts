import logger from "../utils/logger.utils";
import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(<string>process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    logger.info(
      colors.cyan.underline.bold(`MongoDB Connected: ${conn.connection.host}`)
    );
  } catch (err: any) {
    logger.error(colors.red(`Error: ${err.message}`));
    process.exit(1);
  }
};

export default connectDB;

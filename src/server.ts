import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.config";
import logger from "./utils/logger.utils";

dotenv.config({ path: "./.env" });

connectDB();

import notes from "./routes/notes.route";
import users from "./routes/users.route";
import auth from "./routes/auth.route";

const app = express();

app.use(express.json());

app.use("/api/v1/notes", notes);
app.use("/api/v1/users", users);
app.use("/api/v1/auth", auth);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  logger.info(
    colors.yellow.bold(
      `Server running in mode ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  )
);

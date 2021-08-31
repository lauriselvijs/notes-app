const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connectDB();

const notes = require("./routes/notes");
const users = require("./routes/users");
const auth = require("./routes/auth");

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

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

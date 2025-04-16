const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const UserRoute = require("./routes/UserRoute");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://rentrr-web.onrender.com",
    credentials: true,
  })
);
const mongoose = require("mongoose");
app.use(UserRoute);
mongoose
  .connect(
    "mongodb+srv://krgarav:9800664253@cluster0.tjvtu0m.mongodb.net/rentrr?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

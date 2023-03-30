const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");

const app = express();
app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRouter);

mongoose.connect("mongodb://127.0.0.1:27017/mailboxclient").then(() => {
  app.listen(3000, () => {
    console.log("server started");
  });
});

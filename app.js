const express = require("express");
const app = express();
const dotenv = require("dotenv");
const Connection = require("./db/conn.js");
const cors = require("cors");
const cookieparser = require("cookie-parser");
dotenv.config({ path: "./config.env" });

app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(require("./router/auth"));

const middleware = (req, res, next) => {
  console.log("from middleware");
  next();
};

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening from ${port}`);
});
Connection();

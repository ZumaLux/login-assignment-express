const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const router = require("./router/routes");
const session = require("express-session");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "this is a secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
  })
);

app.use(router);

app.listen(3000);

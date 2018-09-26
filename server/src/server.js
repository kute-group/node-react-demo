// import external
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import socket from "socket.io";

// import internal
import routers from "./routers";
import helpers from "./helpers";
const { PORT, DB, SECRET } = require("../config.json");

const app = express();

// connect to database
mongoose.connect(DB);
mongoose.connection.on("error", () =>
  helpers.common.log("Connect failed...", "red")
);
mongoose.connection.on("connected", () =>
  helpers.common.log("Connected database...", "green")
);

// middlewares
app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// express session
app.use(
  session({
    secret: SECRET,
    resave: true,
    saveUninitialized: false
  })
);
// passport init
app.use(passport.initialize());
app.use(passport.session());
// routers
require("./middlewares/passport");

app.get("/", (req, res) => {
  res.json({ message: "Express is up!" });
});
app.use("/api/v1", routers);

// handle errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err });
});

const server = app.listen(PORT, () => {
  helpers.common.log(`Server is running at port: ${PORT}`, "blue");
});

// connect to socket io
const io = socket(server);
global.io = io;
io.on("connection", socket => {
  helpers.common.log(`Socket is running... id = ${socket.id}`, "green");
});

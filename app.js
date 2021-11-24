require("dotenv").config();

const hbs = require("hbs");

var createError = require("http-errors");
var express = require("express");

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const session = require("express-session");
const MongoStore = require("connect-mongo");

var app = express();

// Functional curling style of loading configuration
require("./config/db");
require("./config/global")(app);

// Cookies and sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 24 * 60 * 60,
    }),
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Use of routes
const indexRouter = require("./routes/index.routes");
const authRouter = require("./routes/auth.routes");
const libraryRouter = require("./routes/library.routes");
const feedRouter = require("./routes/feed.routes");
const userRouter = require("./routes/users.routes");

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/library", libraryRouter);
app.use("/feed", feedRouter);
app.use("/users", userRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

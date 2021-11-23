var express = require("express");

var moment = require("moment");

var logger = require("morgan");

const cookieParser = require("cookie-parser");

const favicon = require("serve-favicon");

const path = require("path");

const session = require("express-session");
const MongoStore = require("connect-mongo");

const hbs = require("hbs");

hbs.registerHelper('formatDate', function(dateString) {
  return new hbs.SafeString(
      moment(dateString).format("LLLL").toUpperCase()
  );
});

hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

// Middleware configuration
module.exports = (app) => {
  // In development environment the app logs
  app.use(logger("dev"));

  // To have access to `body` property in the request
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // Normalizes the path to the views folder
  app.set("views", path.join(__dirname, "..", "views"));
  // Sets the view engine to handlebars
  app.set("view engine", "hbs");

  hbs.registerPartials(path.join(__dirname, "..", "views", "partials"));

  // Handles access to the public folder
  app.use(express.static(path.join(__dirname, "..", "public")));

  // Handles access to the favicon
  app.use(
    favicon(path.join(__dirname, "..", "public", "images", "favicon.ico"))
  );

  app.use(
    session({
      secret: "Globtrotters-secret",
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
      }),
    })
  );
};

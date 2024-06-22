require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Init middlewares
app.use(morgan("short"));
app.use(helmet());
app.use(compression());

// Init db
require("./dbs/init.mongdb");

// Init routes
app.use("/", require("./router"));
app.use("/videos", express.static(path.join(__dirname, "uploads/videos")));
// Handling errors
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  const date = new Date().toISOString();
  const paramErrorLogToDev = {
    time: date,
    url: req.url,
    method: req.method,
    query_url: req.query,
    token: req.headers["authorization"],
    body: req.body,
    status: "error",
    code: statusCode,
    error: error.stack,
    message: error.message || "Internal Server Error",
  };
  const paramError = {
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  };
  if (statusCode === 500) {
    // pushToLogError(paramErrorLogToDev)
  }
  return res.status(statusCode).json(paramError);
});

module.exports = app;

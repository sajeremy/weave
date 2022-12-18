const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const cors = require("cors");
const csurf = require("csurf");
const { isProduction } = require("./config/keys");

const usersRouter = require("./routes/api/users");
const csrfRouter = require("./routes/api/csrf");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Security Middleware
if (!isProduction) {
  // Enable CORS only in development because React will be on the React
  // development server (http://localhost:3000). (In production, React files
  // will be served statically on the Express server.)
  app.use(cors());
}

// Set the _csrf token and create req.csrfToken method to generate a hashed
// CSRF token
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

// Attach Express routers
app.use("/api/users", usersRouter);
app.use("/api/csrf", csrfRouter);

module.exports = app;

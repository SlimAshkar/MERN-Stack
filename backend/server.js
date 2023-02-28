// const express = require('express')
// const colors = require('colors')
// const dotenv = require('dotenv').config()
// const { errorHandler } = require('./middleware/errorMiddleware')
// const connectDB = require('./config/db')
// const port = process.env.PORT || 5000

// connectDB()

// const app = express()

// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

// app.use('/api/goals', require('./routes/goalRoutes'))
// app.use('/api/users', require('./routes/userRoutes'))

// app.use(errorHandler)

// app.listen(port, () => console.log(`Server started on port ${port}`))

const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type,Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  if (req.method === "OPTIONS") res.sendStatus(200);
  else next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

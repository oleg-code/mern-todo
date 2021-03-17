const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//Allows me to set up enviroment veriables on the .env file
require("dotenv").config();

/* Creates Express server */

const app = express();
const port = process.env.PORT || 5000;

/*
 * Cors Middleware
 * Parses all incoming and outgoing json
 */
app.use(cors());
app.use(express.json());

/*  */

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB database connection is established successfully");
});

const todoRouter = require("./routes/todos");
const userRouter = require("./routes/users");

app.use("/todos", todoRouter);
app.use("/users", userRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});

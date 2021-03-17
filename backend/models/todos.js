const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema(
	{
		username: { type: String, required: true },
		description: { type: String, required: true },
		duration: { type: Number, required: false },
		completed: { type: Boolean, default: false },
		date: { type: Date, required: true },
	},
	{
		timestamps: true,
	},
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;

const router = require("express").Router();

let Todo = require("../models/todos");

router.route("/").get((req, res) => {
	Todo.find()
		.then(todos => res.json(todos))
		.catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
	const username = req.body.username;
	const description = req.body.description;
	const duration = Number(req.body.duration);
	const completed = req.body.completed;
	const date = Date.parse(req.body.date);

	const newTodo = new Todo({
		username,
		description,
		duration,
		completed,
		date,
	});

	newTodo
		.save()
		.then(() => res.json("Todo added!"))
		.catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
	Todo.findById(req.params.id)
		.then(todos => res.json(todos))
		.catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
	Todo.findByIdAndDelete(req.params.id)
		.then(() => res.json("Todo Deleted"))
		.catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
	Todo.findById(req.params.id)
		.then(todo => {
			todo.username = req.body.username;
			todo.description = req.body.description;
			todo.duration = Number(req.body.duration);
			todo.completed = req.body.completed;
			todo.date = Date.parse(req.body.date);

			todo.save()
				.then(() => res.json("Todo Updated"))
				.catch(err => res.status(400).json("Error: " + err));
		})
		.catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;

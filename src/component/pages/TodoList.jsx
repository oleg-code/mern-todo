import React, { useState, useEffect } from "react";
import axios from "axios";
import Todo from "./Todo";

const TodoList = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/todos/")
			.then(response => {
				console.log(response);
				setTodos(response.data);
			})
			.catch(err => console.log(err));
	}, []);

	const deleteTodo = id => {
		axios.delete("http://localhost:5000/todos/" + id).then(response => console.log(response));

		setTodos(todos.filter(el => el._id !== id));
	};

	const todo = todos.map(todo => {
		return <Todo todo={todo} deleteTodo={deleteTodo} key={todo._id} />;
	});

	return (
		<div>
			<h3>Todos List</h3>
			<table className='table'>
				<thead className='thead-light'>
					<tr>
						<th>Completed</th>
						<th>Category</th>
						<th>Description</th>
						<th>Date</th>
						<th>Duration</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>{todo}</tbody>
			</table>
		</div>
	);
};

export default TodoList;

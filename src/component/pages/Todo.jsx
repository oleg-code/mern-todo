import React from "react";
import { Link } from "react-router-dom";

const Todo = ({ todo, deleteTodo }) => {
	return (
		<tr>
			<td>
				<input type='checkbox' checked={todo.completed} readOnly />
			</td>
			<td>{todo.username}</td>
			<td>{todo.description}</td>
			<td>{todo.date.substring(0, 10)}</td>
			<td>{todo.duration}</td>
			<td>
				<Link to={`/edit/${todo._id}`}>Edit</Link> |{" "}
				<a href='/' onClick={() => deleteTodo(todo._id)}>
					Delete
				</a>
			</td>
		</tr>
	);
};

export default Todo;

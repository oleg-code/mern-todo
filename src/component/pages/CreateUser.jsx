import React, { useState } from "react";
import axios from "axios";

const CreateUser = () => {
	const [username, setUsername] = useState("");

	const onSubmit = e => {
		e.preventDefault();

		const user = {
			username: username,
		};

		axios
			.post("http://localhost:5000/users/add", user)
			.then(result => {
				console.log(result.data);
				setUsername("");
			})
			.catch(err => {
				console.log(err);
				alert("THIS CATEGORY IS ALREADY EXIST");
			});

		console.log(user);
	};

	return (
		<div>
			<h3>Create New Category</h3>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label>Category: </label>
					<input type='text' required className='form-control' value={username} onChange={e => setUsername(e.target.value)} />
				</div>

				<div className='form-group'>
					<input type='submit' value='Create User' className='btn btn-primary' />
				</div>
			</form>
		</div>
	);
};

export default CreateUser;

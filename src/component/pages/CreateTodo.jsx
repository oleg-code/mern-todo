import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateTodo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			description: "",
			duration: 0,
			date: new Date(),
			users: [],
		};
	}

	componentDidMount() {
		//automatically gets called before anything loads
		axios.get("http://localhost:5000/users").then(response => {
			if (response.data.length > 0) {
				this.setState({
					users: response.data.map(user => user.username),
					username: response.data[0].username,
				});
			}
		});
	}
	clear = () => {
		this.setState({
			username: "",
			description: "",
			duration: 0,
			date: new Date(),
		});
	};

	onSubmit = e => {
		const { username, description, duration, date } = this.state;

		e.preventDefault();

		const todo = {
			username,
			description,
			duration,
			date,
		};

		console.log(todo);

		axios
			.post("http://localhost:5000/todos/add", todo)
			.then(result => {
				console.log(result);
				this.clear();
			})
			.catch(err => alert("Something went wrong try again!"));

		window.location = "/";
	};

	renderForm = () => {
		const { username, description, duration, date, users } = this.state;
		return (
			<div>
				<h3>Create New Todo</h3>
				<form onSubmit={this.onSubmit}>
					<div className='form-group'>
						<label>Category: </label>
						<select ref='userInput' required className='form-control' value={username} onChange={e => this.setState({ username: e.target.value })}>
							{users.map(user => {
								return (
									<option key={user} value={user}>
										{user}
									</option>
								);
							})}
						</select>
						<div className='form-group'>
							<label>Description: </label>
							<input type='text' className='form-control' value={description} onChange={e => this.setState({ description: e.target.value })} />
						</div>
						<div className='form-group'>
							<label>Duration (in minutes): </label>
							<input type='text' className='form-control' value={duration} onChange={e => this.setState({ duration: e.target.value })} />
						</div>

						<div className='form-group'>
							<label>Date: </label>
							<div>
								<DatePicker
									selected={date}
									onChange={date => {
										this.setState({ date: date });
									}}
								/>
							</div>
						</div>
						<div className='form-group'>
							<input type='submit' value='Create' className='btn btn-primary' />
						</div>
					</div>
				</form>
			</div>
		);
	};

	render() {
		return <div>{this.renderForm()}</div>;
	}
}

export default CreateTodo;

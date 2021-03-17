import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditTodo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			description: "",
			duration: 0,
			date: new Date(),
			completed: null,
			users: [],
		};
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/todos/" + this.props.match.params.id)
			.then(response => {
				console.log(response);

				this.setState({
					username: response.data.username,
					description: response.data.description,
					duration: response.data.duration,
					date: new Date(response.data.date),
					completed: response.data.completed,
				});
			})
			.catch(err => console.log(err));

		//automatically gets called before anything loads
		axios.get("http://localhost:5000/users").then(response => {
			if (response.data.length > 0) {
				this.setState({
					users: response.data.map(user => user.username),
				});
			}
		});
	}
	onSubmit = e => {
		const { username, description, duration, date, completed } = this.state;

		e.preventDefault();

		const todo = {
			username,
			description,
			duration,
			date,
			completed,
		};

		axios
			.post("http://localhost:5000/todos/update/" + this.props.match.params.id, todo)
			.then(result => {
				console.log(`The result is ${result}`);
			})
			.catch(err => console.log(err));
		window.location = "/";
	};

	renderForm = () => {
		const { username, description, duration, date, users, completed } = this.state;

		return (
			<div>
				<h3>Edit Todo</h3>
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
							<input type='checkbox' checked={completed} onChange={() => this.setState({ completed: !completed })} />

							<label style={{ paddingLeft: ".5em" }}> Task Completed </label>
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
							<input type='submit' value='Edit Todo' className='btn btn-primary' />
						</div>
					</div>
				</form>
			</div>
		);
	};

	render() {
		console.log(this.state.completed);
		return <div>{this.renderForm()}</div>;
	}
}

export default EditTodo;

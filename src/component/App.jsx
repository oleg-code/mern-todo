import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./navigation/Navbar";
import TodoList from "./pages/TodoList";
import EditTodo from "./pages/EditTodo";
import CreateTodo from "./pages/CreateTodo";
import CreateUser from "./pages/CreateUser";

const App = () => {
	return (
		<Router>
			<Navbar />
			<div className='container'>
				<Route path='/' exact component={TodoList} />
				<Route path='/edit/:id' component={EditTodo} />
				<Route path='/create' component={CreateTodo} />
				<Route path='/user' component={CreateUser} />
			</div>
		</Router>
	);
};

export default App;

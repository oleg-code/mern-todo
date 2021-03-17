import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
			<Link to='/' className='navbar-brand'>
				Todo Tracker
			</Link>
			<div className='collapse navbar-collapse'>
				<ul className='navbar-nav'>
					<li className='nav-item'>
						<Link to='/' className='nav-link'>
							Todo List
						</Link>
					</li>
					<li className='nav-item'>
						<Link to='/create' className='nav-link'>
							Create Todo
						</Link>
					</li>
					<li className='nav-item'>
						<Link to='/user' className='nav-link'>
							Create new category
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;

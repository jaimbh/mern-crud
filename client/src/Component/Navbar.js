import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

export default function Navbar(){
	return(
	<nav className="navbar navbar-expand-lg bg-body-tertiary">
	<div className="container-fluid">
		<div className="collapse navbar-collapse" id="navbarSupportedContent">
			<ul className="navbar-nav me-auto mb-2 mb-lg-0">
				<li className="nav-item">
					<Link className="nav-link" aria-current="page" to="/">Home</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/add">Add user</Link>
				</li>
			</ul>
		</div>
	</div>
	</nav>
	);
}
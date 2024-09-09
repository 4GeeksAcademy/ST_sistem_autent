import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1"><FontAwesomeIcon icon={faHouse} /></span>
				</Link>
				<div className="d-flex">
					<div className="me-2" >
						<Link to="/login">
							<button className="btn btn-primary">Login</button>
						</Link>
					</div>
					<div className="ms-3">
						<Link to="/Signup">
							<button className="btn btn-primary">Signup</button>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

import React, { useState, useEffect, useContext } from "react";

import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const Signup = () => {
	const { store, actions } = useContext(Context);
	

	return (
		<div className="container">
			<h2>Login with your account</h2>
			<form>
				<div class="mb-3">
					<label for="exampleInputEmail1" class="form-label">Email address</label>
					<input name="mailInput" type="email" class="form-control" id="mailInput" aria-describedby="emailHelp" placeholder="Enter email"/>
					<div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
				</div>
				<div class="mb-3">
					<label for="exampleInputPassword1" class="form-label">Password</label>
					<input name="passwordInput" type="password" class="form-control" id="passwordInput" placeholder="Password"/>
				</div>
				<button type="submit" class="btn btn-primary">Submit</button>
			</form>
		</div>
		
	);
};


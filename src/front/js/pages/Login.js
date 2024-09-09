import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	
	async function submitForm(event) {
		event.preventDefault();
		let formData = new FormData(event.target);
		let email = formData.get("mailInput");
		let password = formData.get("passwordInput");
	
		if (!email || !password) {
		  setError("All fields are required");
		  return;
		}
	
		setError(null);
	
		try {
		  let response = await actions.loginUser(email, password);
		  if (response.success) {
			
			navigate("/Private");
		  }
		 
		} catch (error) {
		  console.error("Error al hacer login:", error);
		  setError("An error occurred while trying to log in. Please try again later.");
		}
	  }
	
	return (
		<div className="container">
			<h2>Login with your account</h2>
			<form onSubmit={submitForm}>
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
}
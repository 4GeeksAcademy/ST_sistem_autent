import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Signup = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	
	async function submitSignupForm(event) {
		event.preventDefault();
		let formData = new FormData(event.target);
		let email = formData.get("mailInput");
		let password = formData.get("passwordInput");
	
		if (!email || !password) {
		  return;
		}

		try {
		  let response = await actions.signupUser(email, password);
		  if (response.success) {
			
			navigate("/Private");
		  }
		 
		} catch (error) {
		  console.error("Error al hacer login:", error);
		}
	  }
	

	return (
		<div className="container">
			<h2>Login with your account</h2>
			<form onSubmit={submitSignupForm}>
				<div className="mb-3">
					<label for="exampleInputEmail1" className="form-label">Email address</label>
					<input name="mailInput" type="email" className="form-control" id="mailInput" aria-describedby="emailHelp" placeholder="Enter email"/>
					<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
				</div>
				<div className="mb-3">
					<label for="exampleInputPassword1" className="form-label">Password</label>
					<input name="passwordInput" type="password" className="form-control" id="passwordInput" placeholder="Password"/>
				</div>
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		</div>
		
	);
};


import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const Private = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<h1>Private view</h1>
			<img src="https://picsum.photos/id/237/536/354"/>
		</div>
	);
};
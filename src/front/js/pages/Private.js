import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"; // Para redirigir al usuario

export const Private = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

    // Si no hay token, redirige al usuario al login
    useEffect(() => {
        if (!store.token) {
            navigate("/login"); // Redirigir a la página de login
        }
    }, [store.token, navigate]);
	return (
		<div className="container">
			<h1>Private view</h1>
			<img src="https://picsum.photos/id/237/536/354"/>
		</div>
	);
};
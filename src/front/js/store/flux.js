const apiUrl = process.env.BACKEND_URL + "/api";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: null,
			userId: null,
			
		},
		actions: {

			loginUser: async (email,password) => {
				let headers = {
					"Content-Type": "application/json",
				  };
				  try {
					let resp = await fetch(apiUrl + "/login", {
					  method: "POST",
					  body: JSON.stringify({ email, password }),
					  headers: headers,
					});
					if (!resp.ok) {
						setStore({ token: null });
						const errorData = await resp.json();
						console.error("Error al hacer login:", errorData);
						return {
						  success: false,
						  message: errorData.error || "Error desconocido",
						};
					  }
					  let data = await resp.json();
					  setStore({ token: data.access_token });
					  localStorage.setItem("token", data.access_token);
					  localStorage.setItem("user_id", data.user_id);
					  return { success: true };
					} catch (error) {
					  console.error("Error en la solicitud de login:", error);
					  return { success: false, message: "Error en la red o en el servidor" };
					}
			},
			signupUser: async (email, password) => {
				let headers = {
					"Content-Type": "application/json",
				  };
				  let response = await fetch(apiUrl + "/signupuser", {
					method: "POST",
					body: JSON.stringify({ email, password }),
					headers: headers,
				  });
				  if (!resp.ok) {
					const errorData = await resp.json();
					return false;
				  }
				  let data = await resp.json();
				  return true;
			}, 
			logoutUser: async () => {
				try {
					let { token } = getStore();
					if (!token) {
					  console.warn("No hay token disponible para hacer logout");
					  return false;
					}
					let resp = await fetch(`${apiUrl}/logout`, {
						method: "POST",
						headers: {
						  Authorization: "Bearer " + token,
						},
					  });
					  if (!resp.ok) {
						console.error("Error en la solicitud de logout:", resp.statusText);
						return false;
					  }
					  localStorage.clear();
				  setStore({ token: null, userId: null});
				  return true;
				} catch (error) {
				  console.error("Error en logout:", error);
				  localStorage.clear();
				  setStore({ token: null, userId: null});
				  return false;
				}
			},
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			}
			// changeColor: (index, color) => {
			// 	//get the store
			// 	const store = getStore();
			// Use getActions to call a function within a fuction
			// exampleFunction: () => {
			// 	getActions().changeColor(0, "green");
			// },



			// 	//we have to loop the entire demo array to look for the respective index
			// 	//and change its color
			// 	const demo = store.demo.map((elm, i) => {
			// 		if (i === index) elm.background = color;
			// 		return elm;
			// 	});

			// 	//reset the global store
			// 	setStore({ demo: demo });
			// }
		}
	};
};

export default getState;

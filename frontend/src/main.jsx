import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import axios from "axios";
import BASE_URL from "./api.js";

axios.defaults.baseURL = BASE_URL;

// Add a request interceptor to attach the JWT token to every request
axios.interceptors.request.use((config) => {
	const userStr = localStorage.getItem("chat-user");
	if (userStr) {
		try {
			const user = JSON.parse(userStr);
			if (user && user.token) {
				config.headers.Authorization = `Bearer ${user.token}`;
			}
		} catch (error) {
			console.error("Error parsing user from localStorage", error);
		}
	}
	return config;
}, (error) => {
	return Promise.reject(error);
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<SocketContextProvider>
				<App />
			</SocketContextProvider>
		</BrowserRouter>
	</React.StrictMode>
);

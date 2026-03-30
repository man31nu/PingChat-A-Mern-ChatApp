import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import axios from "axios";
import BASE_URL from "./api.js";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<SocketContextProvider>
				<App />
			</SocketContextProvider>
		</BrowserRouter>
	</React.StrictMode>
);

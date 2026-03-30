import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

function App() {
	const { authUser } = useAuthStore();
	const { theme } = useThemeStore();

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [theme]);

	return (
		<div className="min-h-screen w-full relative bg-gray-50 dark:bg-black flex items-center justify-center text-gray-900 dark:text-white transition-colors duration-300">
			{/* X Organizations Black Background with Top Glow */}
			<div
				className="absolute inset-0 z-0 opacity-0 dark:opacity-100 transition-opacity duration-300"
				style={{
					background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000",
					pointerEvents: "none"
				}}
			/>

			{/* Routes Content */}
			<div className="z-10 w-full h-screen flex items-center justify-center">
				<Routes>
					<Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} />
					<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
					<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
				</Routes>
			</div>

			<Toaster />
		</div>
	);
}

export default App;

import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import { Leaf, Activity } from "lucide-react";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
	});

	const { loading, signup } = useSignup();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};

	return (
		<div className="flex w-full h-full bg-white text-black absolute inset-0 z-20">
			{/* Left Panel */}
			<div className="hidden lg:flex w-1/2 bg-[#121826] flex-col items-center justify-center p-12 text-center text-white">
				<h1 className="text-5xl font-bold mb-3 tracking-tight">PingChat</h1>
				<h2 className="text-xl font-medium mb-6">Real-time conversations, simplified.</h2>
				<p className="text-gray-400 max-w-sm mb-12 leading-relaxed text-sm">
					Welcome to your real-time community. Sign up for free and start chatting with friends, colleagues, and groups.
				</p>
				
				<div className="flex items-center gap-6 mb-8">
					<Leaf className="w-8 h-8 text-green-500" />
					<span className="text-3xl font-serif font-bold">ex</span>
					<Activity className="w-8 h-8 text-[#61DAFB]" />
					<div className="w-8 h-8 flex items-center justify-center text-green-600 font-bold border-2 border-green-600 rounded-md">
						<span className="text-xs">JS</span>
					</div>
				</div>
				<div className="bg-gray-800/80 px-6 py-2 rounded-full text-xs font-medium text-gray-300 border border-gray-700 shadow-sm">
					Powered by MERN Stack
				</div>
			</div>

			{/* Right Panel */}
			<div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-50/50 p-6">
				<div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
					{/* Togglers */}
					<div className="bg-gray-100 p-1.5 rounded-full flex mb-8">
						<div className="flex-1 text-center py-2 rounded-full text-sm font-medium bg-indigo-500 text-white shadow-sm transition-all focus:outline-none">
							Sign Up
						</div>
						<Link to="/login" className="flex-1 text-center py-2 rounded-full text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
							Login
						</Link>
					</div>

					<form onSubmit={handleSubmit} className="space-y-4">
						<input
							type="text"
							placeholder="Full Name"
							className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-gray-800 placeholder:text-gray-400 placeholder:font-normal"
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
						<input
							type="text"
							placeholder="Username"
							className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-gray-800 placeholder:text-gray-400 placeholder:font-normal"
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
						<input
							type="password"
							placeholder="Password"
							className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-gray-800 placeholder:text-gray-400 placeholder:font-normal"
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
						<input
							type="password"
							placeholder="Confirm Password"
							className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-gray-800 placeholder:text-gray-400 placeholder:font-normal"
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>

						<button className="w-full mt-6 bg-indigo-500 hover:bg-indigo-600 text-white py-3.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50" disabled={loading}>
							{loading ? <span className="animate-spin inline-block rounded-full border-2 border-solid border-current border-r-transparent h-4 w-4"></span> : "Sign Up"}
						</button>

						<div className="text-center mt-6 text-sm text-gray-400">
							Already have an account? <Link to="/login" className="text-indigo-500 font-semibold hover:underline">Login</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;

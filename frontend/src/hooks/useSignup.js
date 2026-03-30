import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import axios from "axios";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthStore();

	const signup = async ({ fullName, username, password, confirmPassword }) => {
		const success = handleInputErrors({ fullName, username, password, confirmPassword });
		if (!success) return;

		setLoading(true);
		try {
			const res = await axios.post("/api/auth/signup", {
				fullName,
				username,
				password,
				confirmPassword,
			}, {
				headers: { "Content-Type": "application/json" }
			});

			const data = res.data;
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.response?.data?.error || error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};

export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword }) {
	if (!fullName || !username || !password || !confirmPassword) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}

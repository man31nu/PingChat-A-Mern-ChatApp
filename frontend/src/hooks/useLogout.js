import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import axios from "axios";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthStore();

	const logout = async () => {
		setLoading(true);
		try {
			const res = await axios.post("/api/auth/logout", {}, {
				headers: { "Content-Type": "application/json" }
			});
			const data = res.data;
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.removeItem("chat-user");
			setAuthUser(null);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};

export default useLogout;

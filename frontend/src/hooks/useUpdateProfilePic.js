import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const useUpdateProfilePic = () => {
	const [updating, setUpdating] = useState(false);
	const { authUser, setAuthUser } = useAuthStore();

	const updateProfilePic = async (file) => {
		setUpdating(true);
		try {
			const formData = new FormData();
			formData.append("profilePic", file);

			const res = await fetch("/api/users/update-profile-pic", {
				method: "POST",
				body: formData,
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			// data is the updated User model object sent from the backend
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);

			toast.success("Profile picture updated successfully");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setUpdating(false);
		}
	};

	return { updating, updateProfilePic };
};

export default useUpdateProfilePic;

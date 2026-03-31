import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};


export const updateProfile = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;
		const allowedUpdates = ["fullName", "email", "bio"]; // extend as needed
		const updates = {};
		allowedUpdates.forEach((field) => {
			if (req.body[field] !== undefined) {
				updates[field] = req.body[field];
			}
		});
		if (Object.keys(updates).length === 0) {
			return res.status(400).json({ error: "No valid fields provided for update" });
		}
		const updatedUser = await User.findByIdAndUpdate(
			loggedInUserId,
			updates,
			{ new: true }
		).select("-password");
		res.status(200).json(updatedUser);
	} catch (error) {
		console.error("Error in updateProfile: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

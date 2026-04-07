import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			newMessage.status = "delivered";
		}

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		await Promise.all([conversation.save(), newMessage.save()]);

		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // POPULATES message contents

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		// Mark any unseen messages sent to this user as 'seen'
		let updatedToSeenIndices = [];
		for (let i = 0; i < messages.length; i++) {
			let m = messages[i];
			if (m.receiverId.toString() === senderId.toString() && m.status !== "seen") {
				m.status = "seen";
				updatedToSeenIndices.push(m._id);
			}
		}

		if (updatedToSeenIndices.length > 0) {
			await Message.updateMany({ _id: { $in: updatedToSeenIndices } }, { status: "seen" });
			const userToChatSocketId = getReceiverSocketId(userToChatId);
			if (userToChatSocketId) {
				// Tell the other user that their messages were seen
				io.to(userToChatSocketId).emit("messages_status_update", {
					receiverId: senderId,
					status: "seen",
				});
			}
		}

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

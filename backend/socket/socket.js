import { Server } from "socket.io";
import http from "http";
import express from "express";
import Message from "../models/message.model.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: [
			"http://localhost:5173",
			"https://pingchat-a-memchat-app.vercel.app", // True Vercel Origin
			"https://pingchat-a-mernchat-app.vercel.app", // User typo 1
			"https://pingchat-a-mernchat-app.vercel.com", // User typo 2
			process.env.CLIENT_URL,
		].filter(Boolean),
		methods: ["GET", "POST"],
	},
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") {
		userSocketMap[userId] = socket.id;

		// When a user connects, mark any "sent" messages directed to them as "delivered"
		Message.updateMany({ receiverId: userId, status: "sent" }, { status: "delivered" })
			.then(async (result) => {
				if (result.modifiedCount > 0) {
					// Need to notify the senders that their messages are now delivered
					// We'll fetch all messages for this receiver that are now delivered
					const updatedMessages = await Message.find({ receiverId: userId, status: "delivered" }); // Could optimize this, but works for now.
					// Actually, simplified: the senders' clients can just fetch the latest status on their next interaction or we iterate over distinct senders
					const senders = [...new Set(updatedMessages.map((m) => m.senderId.toString()))];
					senders.forEach((senderId) => {
						const senderSocketId = getReceiverSocketId(senderId);
						if (senderSocketId) {
							// Notify sender to update UI for all messages to this receiver
							io.to(senderSocketId).emit("messages_status_update", {
								receiverId: userId,
								status: "delivered",
							});
						}
					});
				}
			})
			.catch((err) => console.log(err));
	}

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// Typing indicator events
	socket.on("typing", ({ senderId, receiverId }) => {
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) io.to(receiverSocketId).emit("typing", senderId);
	});

	socket.on("stop_typing", ({ senderId, receiverId }) => {
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) io.to(receiverSocketId).emit("stop_typing", senderId);
	});

	// Message status events from client
	socket.on("message_delivered", async ({ messageId, senderId }) => {
		await Message.findByIdAndUpdate(messageId, { status: "delivered" });
		const senderSocketId = getReceiverSocketId(senderId);
		if (senderSocketId) io.to(senderSocketId).emit("message_status_update", { messageId, status: "delivered" });
	});

	socket.on("message_seen", async ({ messageId, senderId }) => {
		await Message.findByIdAndUpdate(messageId, { status: "seen" });
		const senderSocketId = getReceiverSocketId(senderId);
		if (senderSocketId) io.to(senderSocketId).emit("message_status_update", { messageId, status: "seen" });
	});

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };

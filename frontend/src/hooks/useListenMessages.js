import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../store/useConversation";

import notificationSound from "../assets/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages, selectedConversation, addTypingUser, removeTypingUser } = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();

			// Only add to messages window if it belongs to currently selected conversation
			if (selectedConversation && selectedConversation._id === newMessage.senderId) {
				setMessages([...messages, newMessage]);
				socket?.emit("message_seen", { messageId: newMessage._id, senderId: newMessage.senderId });
			} else {
				socket?.emit("message_delivered", { messageId: newMessage._id, senderId: newMessage.senderId });
			}
		});

		socket?.on("message_status_update", ({ messageId, status }) => {
			setMessages(
				messages.map((m) => {
					if (m._id === messageId) {
						return { ...m, status };
					}
					return m;
				})
			);
		});

		socket?.on("messages_status_update", ({ receiverId, status }) => {
			setMessages(
				messages.map((m) => {
					if (m.receiverId === receiverId && m.status !== "seen") {
						return { ...m, status };
					}
					return m;
				})
			);
		});

		socket?.on("typing", (userId) => {
			addTypingUser(userId);
		});

		socket?.on("stop_typing", (userId) => {
			removeTypingUser(userId);
		});

		return () => {
			socket?.off("newMessage");
			socket?.off("message_status_update");
			socket?.off("messages_status_update");
			socket?.off("typing");
			socket?.off("stop_typing");
		};
	}, [socket, setMessages, messages, selectedConversation, addTypingUser, removeTypingUser]);
};

export default useListenMessages;

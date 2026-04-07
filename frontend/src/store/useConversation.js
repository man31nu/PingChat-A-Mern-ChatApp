import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),
	typingUsers: [],
	addTypingUser: (userId) =>
		set((state) => ({
			typingUsers: state.typingUsers.includes(userId) ? state.typingUsers : [...state.typingUsers, userId],
		})),
	removeTypingUser: (userId) =>
		set((state) => ({
			typingUsers: state.typingUsers.filter((id) => id !== userId),
		})),
}));

export default useConversation;

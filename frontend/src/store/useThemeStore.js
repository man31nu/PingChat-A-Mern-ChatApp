import { create } from "zustand";

export const useThemeStore = create((set) => ({
	theme: localStorage.getItem("chat-theme") || "dark",
	setTheme: (theme) => {
		localStorage.setItem("chat-theme", theme);
		// Optionally update the root element class right here,
		// but standard React way is to do it in an effect in App.jsx
		set({ theme });
	},
}));

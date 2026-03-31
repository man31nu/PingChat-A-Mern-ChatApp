import { useRef, useState, useCallback, useEffect } from "react";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import { useAuthStore } from "../../store/useAuthStore";
import { useThemeStore } from "../../store/useThemeStore";
import { Moon, Sun } from "lucide-react";

const Sidebar = () => {
	const { authUser } = useAuthStore();
	const { theme, setTheme } = useThemeStore();

	const [sidebarWidth, setSidebarWidth] = useState(288); // 288px is equivalent to w-72
	const isResizing = useRef(false);

	const startResizing = useCallback((e) => {
		isResizing.current = true;
		document.addEventListener("mousemove", resize);
		document.addEventListener("mouseup", stopResizing);
		// Prevent text selection while resizing
		document.body.style.userSelect = 'none';
	}, []);

	const resize = useCallback((e) => {
		if (isResizing.current) {
			// Limit width between 200px and 600px
			const newWidth = Math.min(Math.max(e.clientX, 200), 600);
			setSidebarWidth(newWidth);
		}
	}, []);

	const stopResizing = useCallback(() => {
		isResizing.current = false;
		document.removeEventListener("mousemove", resize);
		document.removeEventListener("mouseup", stopResizing);
		document.body.style.userSelect = '';
	}, [resize]);

	// Cleanup listeners on unmount
	useEffect(() => {
		return () => {
			document.removeEventListener("mousemove", resize);
			document.removeEventListener("mouseup", stopResizing);
			document.body.style.userSelect = '';
		};
	}, [resize, stopResizing]);

	return (
		<div 
			className='relative border-r border-gray-200 dark:border-gray-600 p-4 flex flex-col bg-white/60 dark:bg-black/30 backdrop-blur-sm transition-colors duration-300'
			style={{ width: `${sidebarWidth}px`, flexShrink: 0 }}
		>
			{/* Resizer Handle */}
			<div 
				className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-blue-500/50 active:bg-blue-500 transition-colors z-[100] transform translate-x-1/2"
				onMouseDown={startResizing}
			/>

			{/* User Profile Info */}
			<div className="flex items-center gap-3 mb-4 p-2 bg-gray-100 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors">
				<div className="relative shrink-0">
					<div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600 flex items-center justify-center bg-blue-500 text-white font-bold text-xl uppercase">
						{authUser?.fullName?.charAt(0) || "?"}
					</div>
				</div>
				<div className="flex-1 min-w-0 flex items-center justify-between">
					<p className="text-gray-900 dark:text-white font-semibold truncate text-sm">{authUser?.fullName}</p>
					<button 
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						className="p-1.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors focus:outline-none"
					>
						{theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
					</button>
				</div>
			</div>


			<SearchInput />
			<div className='divider px-3 border-t border-gray-200 dark:border-gray-600 my-4 transition-colors'></div>
			<Conversations />
			<LogoutButton />
		</div>
	);
};
export default Sidebar;

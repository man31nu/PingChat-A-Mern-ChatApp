import { LogOut } from "lucide-react";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto pt-4 border-t border-gray-200 dark:border-gray-600 transition-colors'>
			{!loading ? (
				<button onClick={logout} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 p-2 rounded-lg transition-all w-full">
					<LogOut className='w-6 h-6' />
					<span>Logout</span>
				</button>
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};
export default LogoutButton;

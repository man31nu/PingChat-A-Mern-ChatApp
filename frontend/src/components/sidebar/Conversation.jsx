import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../store/useConversation";

const Conversation = ({ conversation, lastIdx }) => {
	const { selectedConversation, setSelectedConversation, typingUsers } = useConversation();

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			<div
				className={`flex gap-3 justify-between items-center hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl p-3 py-2 cursor-pointer transition-all ${
					isSelected ? "bg-blue-100/50 dark:bg-blue-600/30 border border-blue-200 dark:border-blue-500/50" : ""
				}`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className={`relative ${isOnline ? "online" : ""}`}>
					<div className='w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600 flex items-center justify-center bg-teal-500 text-white font-bold text-xl uppercase'>
						{conversation.fullName?.charAt(0) || "?"}
					</div>
					{isOnline && (
						<span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
					)}
				</div>

				<div className='flex flex-col flex-1 pb-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-800 dark:text-gray-200 transition-colors flex items-center gap-2 flex-wrap'>
							{conversation.fullName}
							{typingUsers?.includes(conversation._id) && (
								<span className='text-xs font-normal text-blue-500 italic animate-pulse'>
									typing ......
								</span>
							)}
						</p>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-1 py-0 h-1 border-t border-gray-200 dark:border-gray-700/50 w-full transition-colors' />}
		</>
	);
};
export default Conversation;

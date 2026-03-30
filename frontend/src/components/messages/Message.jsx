import { useAuthStore } from "../../store/useAuthStore";
import useConversation from "../../store/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
	const { authUser } = useAuthStore();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const msgBgClass = fromMe 
		? "bg-blue-600 border-blue-500 text-white" 
		: "bg-gray-200 border-gray-300 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white";
	const justClass = fromMe ? "justify-end" : "justify-start";
	const shakeClass = message.shouldShake ? "animate-shake" : "";

	return (
		<div className={`flex w-full mb-4 ${justClass}`}>
			<div className={`flex max-w-[80%] ${fromMe ? "flex-row-reverse" : "flex-row"} items-end gap-2`}>
				<div className='w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 overflow-hidden shrink-0 flex items-center justify-center bg-gray-100 dark:bg-black/50 transition-colors'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} className="w-full h-full object-cover" />
				</div>
				<div className={`flex flex-col gap-1 ${fromMe ? "items-end" : "items-start"}`}>
					<div className={`px-4 py-2 rounded-2xl border shadow-sm ${msgBgClass} ${shakeClass} break-words transition-colors`}>
						{message.message}
					</div>
					<div className='text-xs text-gray-500 dark:text-gray-400 flex gap-1 items-center font-medium transition-colors'>{formattedTime}</div>
				</div>
			</div>
		</div>
	);
};
export default Message;

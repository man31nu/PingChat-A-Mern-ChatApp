import { useEffect } from "react";
import useConversation from "../../store/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { MessageSquare } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='flex flex-col w-full h-full bg-white/20 dark:bg-black/40 backdrop-blur-sm transition-colors duration-300'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-white/80 dark:bg-black/60 px-6 py-4 mb-2 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3 shadow-md dark:shadow-lg transition-colors'>
						<span className='label-text flex items-center gap-2 text-gray-700 dark:text-gray-300 transition-colors'>
							<span className='w-2 h-2 rounded-full bg-green-500'></span>
							To:
						</span>{" "}
						<span className='text-gray-900 dark:text-gray-100 font-bold transition-colors'>{selectedConversation.fullName}</span>
					</div>
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthStore();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center text-gray-600 dark:text-gray-400 font-medium flex flex-col items-center gap-4 bg-white/40 dark:bg-white/5 p-8 rounded-2xl border border-gray-200 dark:border-white/10 backdrop-blur-md shadow-2xl transition-colors'>
				<MessageSquare className="w-16 h-16 text-blue-500 mb-2 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
				<p className="text-2xl text-gray-900 dark:text-white font-bold tracking-tight transition-colors">Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
			</div>
		</div>
	);
};

import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import useConversation from "../../store/useConversation";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	const { typingUsers, selectedConversation } = useConversation();
	useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		<div className='px-6 flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent'>
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}

			{loading && [...Array(3)].map((_, idx) => (
				<div key={idx} className='flex gap-4 mb-4 items-center animate-pulse'>
					<div className='w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600'></div>
					<div className='flex flex-col gap-2'>
						<div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-40'></div>
						<div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-60'></div>
					</div>
				</div>
			))}

			{!loading && selectedConversation && typingUsers.includes(selectedConversation._id) && (
				<div className='flex gap-4 mb-4 items-center pl-2' ref={lastMessageRef}>
					<div className='flex flex-col gap-1'>
						<div className='px-4 py-2 rounded-2xl border shadow-sm bg-gray-200 border-gray-300 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white break-words transition-colors flex gap-1 items-center'>
							<span className='w-2 h-2 rounded-full bg-gray-500 animate-bounce'></span>
							<span className='w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-100'></span>
							<span className='w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-200'></span>
						</div>
					</div>
				</div>
			)}

			{!loading && messages.length === 0 && (
				<p className='text-center text-gray-500 dark:text-gray-400 mt-10 transition-colors'>Send a message to start the conversation</p>
			)}
		</div>
	);
};
export default Messages;

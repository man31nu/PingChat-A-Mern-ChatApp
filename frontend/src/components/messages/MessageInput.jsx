import { useState } from "react";
import { Send } from "lucide-react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};

	return (
		<form className='px-6 my-4 w-full relative' onSubmit={handleSubmit}>
			<div className='relative w-full border border-gray-300 dark:border-gray-600 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md overflow-hidden group focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all'>
				<input
					type='text'
					className='w-full text-sm block p-3 px-5 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none'
					placeholder='Send a message...'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-4 text-gray-400 group-focus-within:text-blue-500 hover:text-blue-400 transition-colors'>
					{loading ? <div className='loading loading-spinner'></div> : <Send className="w-5 h-5" />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;

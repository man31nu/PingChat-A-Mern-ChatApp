import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();

	return (
		<div className='flex-1 overflow-auto flex flex-col pt-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent pr-2 max-h-[calc(100vh-160px)]'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

			{loading ? <span className='animate-spin mx-auto w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full'></span> : null}
		</div>
	);
};
export default Conversations;

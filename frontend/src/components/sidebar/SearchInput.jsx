import { useState } from "react";
import { Search } from "lucide-react";
import useConversation from "../../store/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};

	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2'>
			<input
				type='text'
				placeholder='Search…'
				className='w-full px-4 py-2 bg-white/40 dark:bg-black/40 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button type='submit' className='p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors'>
				<Search className='w-5 h-5 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;

import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className='flex w-full h-full overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;

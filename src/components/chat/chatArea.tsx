import Navbar from "./nav";


interface ChatAreaProps {
    messages: { text: string; isUser: boolean }[]; // Define the type of messages
    profile: {  userName: string;
        email: string;
        role: string;
        imageUrl: string;
        lastSeen?: string; 
        lastSeenDateTime?: string;};
}
const ChatArea: React.FC<ChatAreaProps> = ({ messages,profile }) => {
    const {userName,imageUrl}=profile
    
    return (
        <div className="flex-grow h-screen  overflow-y-auto bg-gray-100" >
            <Navbar userName={userName} profileImg={imageUrl}></Navbar>
            {/* Display chat messages */}
            {messages.map((message, index) => (
                <div   key={index} style={{width:'100%',height:'8%'}}>
                    <div
                      
                        className={`mb-2 ${message.isUser
                                ? 'bg-blue-500 text-white rounded-tr rounded-br float-right p-3 clear-right m-5'
                                : 'bg-gray-300 text-black rounded-tl rounded-bl float-left p-3 clear-left m-5'
                            }`}
                    >
                        {message.text}
                        <div className="clear-both"></div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatArea;

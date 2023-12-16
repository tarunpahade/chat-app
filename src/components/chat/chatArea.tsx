'use client'
import { ObjectId } from "mongodb";
import Navbar from "./nav";


interface ChatAreaProps {
    messages: { text: string; isUser: boolean }[]; // Define the type of messages
    profile: {  username: string;
        email: string;
        imageUrl: string;
        lastSeen?: string; 
        lastSeenDateTime?: string;
    
    };
    onBackPress:any
}
const ChatArea: React.FC<ChatAreaProps> = ({ messages,profile,onBackPress }) => {
    const {username,imageUrl}=profile
    
    return (
        <div className="flex-grow h-screen  " >
            <Navbar userName={username} profileImg={imageUrl} onBackPress={onBackPress}></Navbar>
            {/* Display chat messages */}
            <div className="max-h-[80%] overflow-y-auto ">
            {messages.map((message, index) => (
                <div   key={index} style={{width:'100%',height:'8%'}}>
                    <div
                      
                        className={`mb-2 bg-gray-200 border  ${message.isUser
                                ? 'max-w-[14em]  rounded-tr rounded-br float-right p-3 clear-right m-5 text-black'
                                : 'max-w-[14em] rounded-tl rounded-bl float-left p-3 clear-left m-5 text-black'
                            }`}
                    >

                       <h2> {message.text}</h2>
                        <div className="clear-both"></div>

                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default ChatArea;

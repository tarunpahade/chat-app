// components/ChatInput.js
const ChatInput = ({ value, onChange, sendMsg }:any) => {
    return (
        <div className="absolute bottom-5  p-2 flex items-center border-t border-gray-200 " >
            <input
                type="text"
                value={value}
                onChange={onChange}
                // style={{ width: '90%' }}
                placeholder="Type your message..."
                className="flex-grow p-2 w-96 rounded-l border border-gray-300 focus:outline-none "
            />
            <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-700 focus:outline-none"
                onClick={sendMsg}

            >
                Send
            </button>
        </div>
    );
};

export default ChatInput;

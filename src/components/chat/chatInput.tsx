'use client'

import { Send } from "react-feather";

const ChatInput = ({ value, onChange, sendMsg ,disabled}:any) => {

    return (
        <div className="absolute  bottom-5 pl-10 p-2 flex  w-[80%] items-center" >
            <input
                type="text"
                value={value}
                onChange={onChange}
                // style={{ width: '90%' }}
                placeholder="Type your message..."
                className="flex-grow p-2 w-[90%] text-black rounded-l border bg-white border-gray-300 focus:outline-none "
                onKeyDownCapture={(e) => {
                    if (e.key === "Enter") {
                      sendMsg();
                    }
                  }}
            />
            <button
            disabled={disabled}
                type="button"
                className="bg-blue-700 ml-3 px-4 dark:text-white py-2 rounded-r hover:bg-blue-700 focus:outline-none"
                onClick={sendMsg}
            >
                <Send className="" size={20} />
            </button>
        </div>
    );
};

export default ChatInput;

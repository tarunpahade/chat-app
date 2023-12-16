"use client";
import { useTheme } from "next-themes";
import { Sun, Moon, Search } from "react-feather";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
const Header = ({showPopup}:any) => {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
const clickPopup=()=>{
  console.log('showing Popup');
  
  console.log(showPopup);
  
  showPopup()
}

  return (
    <header className=" p-4 w-full flex items-center justify-between ">
      <div className="text-gray-300 ml-6 text-2xl font-mono font-bold">
        Chats
      </div>
      <div className="flex">
        <button
          onClick={clickPopup}
          className="text-white hover:text-gray-300 bg focus:outline-none bg-white px-5 py-2 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 rounded-lg hover:bg-gray-100 duration-300 transition-colors border"
        >
          <Search size={20} />
        </button>

        <button
          onClick={toggleTheme}
          className="text-white hover:text-gray-300 bg focus:outline-none bg-white px-5 py-2 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 rounded-lg hover:bg-gray-100 duration-300 transition-colors border"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <a
          onClick={() => signOut()}
          className="p-1.5 bg-white  dark:bg-gray-900 px-5 py-2 dark:border-gray-700 dark:hover:bg-gray-800 rounded-lg hover:bg-gray-100 duration-300 transition-colors border text-gray-300 ml-2 cursor-pointer focus:outline-nones dark:text-gray-200hover:bg-gray-100 hover:text-blue-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-log-out"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </a>
      </div>
   
    </header>
  );
};

export default Header;

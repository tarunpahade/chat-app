'use client'
import Image from "next/image";
interface NavbarProps {
  userName: string; // Define the type of userName
  profileImg: string;
  onBackPress:any
}

// components/Navbar.js
const Navbar: React.FC<NavbarProps> = ({ userName, profileImg,onBackPress }) => {
  return (
    <nav style={{
      padding: '1.42em',

    }} className="md:p-0.5  items-center justify-center  z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:top-0 md:relative md:opacity-100 md:translate-x-0">
      <div className="flex items-center">
        <svg onClick={onBackPress} xmlns="http://www.w3.org/2000/svg" width="24" height="24" color="#fff" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left  ">
          <polyline points="12 19 5 12 12 5"></polyline></svg>
        <Image
          src={profileImg}
          alt="User Profile"
          className="w-10 h-10 rounded-full mr-2"
          width={12}
          height={10}
        />
        <p style={{ color: '#fff', fontSize: "16px" }}>{userName}</p>
      </div>
    </nav>
  );
};

export default Navbar;

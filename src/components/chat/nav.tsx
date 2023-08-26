import Image from "next/image";
interface NavbarProps {
    userName: string; // Define the type of userName
    profileImg: string
  }
  
// components/Navbar.js
const Navbar:React.FC<NavbarProps> = ({ userName ,profileImg}) => {
    return (
      <nav style={{    padding: '1.42em'}} className=" absolute items-center justify-center  inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0">
        <div className="flex items-center">
          <Image
            src={profileImg}
            alt="User Profile"
            className="w-10 h-10 rounded-full mr-2"
            width={12}
            height={10}
          />
          <p style={{ color: '#fff',fontSize:"16px" }}>{userName}</p>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  
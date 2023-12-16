'use client'
import Image from "next/image"
import axios from "axios"
import { useSession,signOut } from "next-auth/react"

export const Nav = () => {
    const { data: session}=useSession()
    
    
   
        return (
        <aside className=" mr-1 hidden md:block  flex-col items-center w-16 py-8 overflow-y-auto bg-white border-r rtl:border-l rtl:border-r-0 dark:bg-gray-800 dark:border-gray-700">
            <nav className="flex flex-col flex-1 space-y-6 ">
                <a href="#">
                    <Image className="w-auto h-10 " width={10} height={10} src={session?.user.image!} alt="User I mage" />
                </a>

                <a href="#" className="p-1.5 text-gray-700   focus:outline-nones cursor-pointer transition-colors duration-200 rounded-lg dark:text-gray-200 hover:bg-gray-100 hover:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </a>



                <a href="#" className="p-1.5 text-gray-700 focus:outline-nones cursor-pointer transition-colors duration-200 rounded-lg dark:text-gray-200hover:bg-gray-100 hover:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                </a>
                <a onClick={()=>signOut()}  className="p-1.5 text-gray-700 cursor-pointer focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-200hover:bg-gray-100 hover:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                </a>

            </nav>

        </aside>
    )
}

import Image from "next/image";

interface People {
  userName: string;
  email: string;
  role: string;
  imageUrl: string;
  lastSeen?: string; // Make it optional
  lastSeenDateTime?: string;
}

interface ListProps {
  data: People[];
  onPress: any;
}
export const List: React.FC<ListProps> = ({ data,onPress }) => {
  return (
    <ul role="list" className="divide-y divide-gray-100">
         <div  style={{ display:'flex'}} className=" absolute items-center justify-center  inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0  ">
      <button style={{ width: '90%' }} className="bg-white m-5 mb-5 mt-5 ml-5 dark:bg-gray-900  dark:border-gray-700 dark:hover:bg-gray-800 rounded-lg hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5">
        <p className=" " style={{ color: "#fff" }}>
          New Chat
        </p>
      </button>
      </div>
      {data.map((person: People) => (
        <li
          key={Math.random() * 50000}
          className="flex md:none justify-between pr-5 gap-x-6 py-5  hover:bg-gray-200 transition duration-200 ease-in-out"
          onClick={()=>{onPress(person)}}
        >
          <div className="flex min-w-0 gap-x-4">
            <Image
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              width={12}
              height={12}
              src={person.imageUrl}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm cursor-pointer font-semibold leading-6 text-gray-900">
                {person.userName}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {person.email}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900"></p>
            {person.lastSeen ? (
              <p className="mt-1 text-xs leading-5 md:hidden text-gray-500">
                Last seen {person.lastSeen}
              </p>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5 md:hidden">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Online</p>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

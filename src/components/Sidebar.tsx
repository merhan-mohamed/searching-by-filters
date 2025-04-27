import { FcBusinessman } from "react-icons/fc";
import { GoFileDirectoryFill } from "react-icons/go";
import { IoIosSettings } from "react-icons/io";

const Sidebar = () => {
  return (
    <div className='w-16 fixed h-screen border border-[#242424] p-4 flex flex-col items-center space-y-8'>
      <div className="text-white">Logo</div>
      <div className="text-gray-400"><GoFileDirectoryFill className="text-xl" /></div>
      <div className="text-gray-400"><FcBusinessman className="text-xl"/></div>
      <div className="text-gray-400"><IoIosSettings className="text-xl"/></div>
    </div>
  )
}

export default Sidebar

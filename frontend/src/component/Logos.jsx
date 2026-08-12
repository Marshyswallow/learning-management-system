import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
function Logos() {
  return (
    <div className='mx-auto flex min-h-[90px] max-w-6xl items-center justify-center gap-3 px-2 py-3 flex-wrap'>
      <div className='flex items-center justify-center gap-2 rounded-full bg-gray-100 px-4 py-2.5 text-sm text-[#03394b]'>
      <MdCastForEducation className='w-[35px] h-[35px] fill-[#03394b]'/>
      20k+ online Courses
      </div>
      <div className='flex items-center justify-center gap-2 rounded-full bg-gray-100 px-4 py-2.5 text-sm text-[#03394b]'>
      <SiOpenaccess className='w-[35px] h-[35px] fill-[#03394b]'/>
      Lifetime Access
      </div>
      <div className='flex items-center justify-center gap-2 rounded-full bg-gray-100 px-4 py-2.5 text-sm text-[#03394b]'>
      <FaSackDollar className='w-[35px] h-[35px] fill-[#03394b]'/>
      Value for Money
      </div>
      <div className='flex items-center justify-center gap-2 rounded-full bg-gray-100 px-4 py-2.5 text-sm text-[#03394b]'>
      <FaUsers className='w-[35px] h-[35px] fill-[#03394b]'/>
      Community Support
      </div>
      <div className='flex items-center justify-center gap-2 rounded-full bg-gray-100 px-4 py-2.5 text-sm text-[#03394b]'>
      <BiSupport className='w-[35px] h-[35px] fill-[#03394b]'/>
      Lifetime Support
      </div>
    </div>
  )
}

export default Logos

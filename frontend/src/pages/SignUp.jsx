import React, { useState } from 'react';
import logo from "../assets/logo.jpg";
import google from "../assets/google.jpg"
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify'
import {ClipLoader} from 'react-spinners'
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth,provider } from '../../utils/firebase';

function SignUp() {
  const [show,setShow]=useState(false)
  const navigate=useNavigate();
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [role,setRole]=useState("student")
  const [loading,setLoading]= useState(false)
  const dispatch =useDispatch()
  const handleSignUp = async () => {
    try {
      setLoading(true)
      const result = await axios.post(serverUrl + "api/auth/signup", 
        { name, password, email, role }, 
        { withCredentials: true }
      )
      dispatch(setUserData(result.data.user)) 
      setLoading(false)        
      toast.success("Signup successful")
      navigate("/")
    } catch (error) {
      console.log(error)
      setLoading(false)        
      toast.error(error.response?.data?.message || "Something went wrong")  
    }
  }


  const googleSignUp = async()=>{
    try {
      const response= await signInWithPopup(auth,provider)
      console.log(response)
      const user=response.user
      const name=user.displayName
      const email=user.email
      
      const result = await axios.post(serverUrl+"api/auth/googleAuth",{name,email,role},{withCredentials:true})
      dispatch(setUserData(result.data.user))       
      toast.success("Signup successful")
      navigate("/")
    } catch (error) {
      toast.error(error.response?.data?.message || "Google signup failed")
    }
  }
  return (

    <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center'>

      <form className='w-[90%] md:w-[700px] h-[600px] bg-white shadow-xl rounded-2xl flex' onSubmit={(e)=>e.preventDefault()}>

        {/* Left Side */}
        <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3'>
          <div>
            <h1 className='font-semibold text-[black] text-2xl'>let's get started</h1>
            <h2 className='text-[#999797] text-[18px]'>Create your account</h2>
          </div>
          <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
          <label htmlFor="name" className='font-semibold'>Name</label>
          <input id='name' type="text" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Your name' onChange={(e)=>setName(e.target.value)} value={name}/>
          </div>
          
          <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
         <label htmlFor="email" className='font-semibold'>Email</label>
        <input id='email' type="email" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Your email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
        </div>
        <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>
         <label htmlFor="password" className='font-semibold'>Password</label>
         
        <input id='password' type={show?"text":"password"} className='border w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Your password' onChange={(e)=>setPassword(e.target.value)} value={password} />
       {!show? <IoEyeOutline onClick={()=>{setShow(true)}} className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' />
         :
        <IoEye onClick={()=>{setShow(false)}}className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]'  />}

        
        </div>

        <div className='flex md:w-[50%] w-[70%] items-center justify-between'>
          <span className={`px-[10px] py-[5px] border-[1px] border-[#e7e6e6] rounded-2xl cursor-pointer hover:border-black ${role==="student"?"border-black":"border-[#646464]"}`} onClick={()=>setRole("student")}>Student</span>
          <span className={`px-[10px] py-[5px] border-[1px] border-[#e7e6e6] rounded-2xl cursor-pointer hover:border-black ${role==="educator"?"border-black":"border-[#646464]"}`} onClick={()=>setRole("educator")}>Educator</span>
        </div>

        <button className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]' onClick={handleSignUp} disabled={loading}>
          {loading? <ClipLoader size={30} color='white' />:"SignUp"}</button>

        <div className=' w-[80%] flex items-center gap-2'>
          <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
          <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>Or Continue</div>
          <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
        </div>

        <div className='w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center ' onClick={googleSignUp}>
          <img src={google} className='w-[25px]' alt="" />
          <span className='text-[18px] text-gray-500'>oogle</span>
        </div>

        <div className='text-[#6f6f6f]'>already have an account?
          <span className='ml-2 underline underline-offset-1 text-[black] cursor-pointer' onClick={()=>navigate("/login")}>Login</span>
         </div>
        </div>

        {/* Right Side */}
        <div className='w-[50%] h-[100%] rounded-r-2xl bg-black md:flex items-center justify-center flex-col hidden'>

          <img
            src={logo}
            alt="logo"
            className='w-30 shadow-2xl'
          />

          <span className='text-2xl text-white'>
            VIRTUAL COURSES
          </span>

        </div>

      </form>

    </div>
  );
}

export default SignUp;
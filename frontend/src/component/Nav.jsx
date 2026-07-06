import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

function Nav() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showHam, setShowHam] = useState(false);
  const btnClass =
    "w-[160px] text-center px-[20px] py-[6px] border-2 border-white text-white rounded-[10px] text-[16px] font-light cursor-pointer hover:bg-white hover:text-black transition-all duration-200 bg-[#000000d5]";

  const handleLogout = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}api/auth/logout`, // no leading slash
        {},
        { withCredentials: true }
      );
      dispatch(setUserData(null));
      setShowHam(false); // ✅ close the mobile menu
      setShow(false); // ✅ close the desktop dropdown too
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div>
      <div className="w-full h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10">
        <div className="lg:w-[20%] w-[40%] lg:pl-[50px] flex items-center  ">
          <img
            src={logo}
            alt=""
            className="h-[50px] w-auto object-contain rounded-lg  "
          />
        </div>

        {/* ✅ hidden on mobile */}
        <div className="w-[30%] hidden lg:flex items-center justify-center gap-4">
          {!userData && (
            <IoPersonCircleOutline
              className="w-[50px] h-[50px] fill-white cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            />
          )}
          {userData?.photoUrl ? <img src={userData.photoUrl} className="w-[40px] h-[40px] rounded-full bg-white text-black flex items-center justify-center font-bold text-[18px] cursor-pointer" onClick={() => setShow((prev) => !prev)}/>:
            <div
              className="w-[40px] h-[40px] rounded-full bg-white text-black flex items-center justify-center font-bold text-[18px] cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              {userData?.name?.slice(0, 1).toUpperCase()}
            </div>
          }
          {userData?.role === "educator" && (
            <div className="px-[20px] py-[6px] border-2 border-white text-white rounded-[10px] text-[16px] font-light cursor-pointer hover:bg-white hover:text-black transition-all duration-200 bg-[#000000d5]" onClick={()=>navigate("/dashboard")}>
              Dashboard
            </div>
          )}
          {!userData ? (
            <span
              onClick={() => navigate("/login")}
              className="px-[20px] py-[6px] border-2 border-white text-white rounded-[10px] text-[16px] font-light cursor-pointer hover:bg-white hover:text-black transition-all duration-200 bg-[#000000d5]"
            >
              Login
            </span>
          ) : (
            <span
              className="px-[20px] py-[6px] border-2 border-white text-white rounded-[10px] text-[16px] font-light cursor-pointer hover:bg-white hover:text-black transition-all duration-200 bg-[#000000d5]"
              onClick={handleLogout}
            >
              LogOut
            </span>
          )}

          {show && (
            <div className="absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-[white] px-[15px] py-[10px] border-[2px] border-black hover:border-white hover:text-white cursor-pointer hover:bg-black">
              <span
                className="bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600"
                onClick={() => navigate("/profile")}
              >
                My Profile
              </span>
              <span
                className="bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600"
                onClick={() => navigate("/courses")}
              >
                My Courses
              </span>
            </div>
          )}
        </div>
        <GiHamburgerMenu
          className="w-[35px] h-[35px] lg:hidden fill-white cursor-pointer"
          onClick={() => setShowHam((prev) => !prev)}
        />

        <div
          className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-20 lg:hidden transition-transform duration-300 ${
            showHam ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <RxCross2
            className="w-[40px] h-[40px] text-white absolute top-5 right-[2%] cursor-pointer"
            onClick={() => setShowHam((prev) => !prev)}
          />
          {!userData && (
            <IoPersonCircleOutline
              className="w-[50px] h-[50px] text-white cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            />
          )}
          {userData?.photoUrl ? <img src={userData.photoUrl}  className="w-[40px] h-[40px] rounded-full bg-white text-black flex items-center justify-center font-bold text-[18px] cursor-pointer"/>:
            <div className="w-[40px] h-[40px] rounded-full bg-white text-black flex items-center justify-center font-bold text-[18px] cursor-pointer">
              {userData?.name?.slice(0, 1).toUpperCase()}
            </div>
          }

          
          <div className={btnClass} onClick={() => navigate("/profile")}>
              My Profile
          </div>
          
          {userData && (
            <div className={btnClass} onClick={() => navigate("/courses")}>
              My Courses
            </div>
          )}
          {userData?.role === "educator" && (
            <div className={btnClass} onClick={()=>navigate("/dashboard")}>Dashboard</div>
          )}
          {!userData ? (
            <div className={btnClass} onClick={() => navigate("/login")}>
              Login
            </div>
          ) : (
            <div className={btnClass} onClick={handleLogout}>
              Log Out
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;

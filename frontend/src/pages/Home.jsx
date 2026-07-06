import React from "react";
import Nav from "../component/Nav";
import home from "../assets/Home1.jpg";
import SearchAi from "../assets/SearchAi.png";
import Logo from "../component/Logos";
import ExploreCourses from"../component/ExploreCourses"
import CardPage from "../component/CardPage";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate=useNavigate()
  return (
    <div className="w-[100%] overflow-hidden">
      <div className="w-[100%] lg:h-[140vh] h-[70vh] relative">
        <Nav />
        <img
          src={home}
          alt="home"
          className="object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh]"
        />

        <span className="lg:text-[70px] text-[20px] md:text-[40px] absolute lg:top-[10%] top-[12%] w-[100%] flex items-center justify-center text-white font-bold">
          Grow Your Skills To Advance
        </span>

        <span className="lg:text-[70px] text-[20px] md:text-[40px] absolute lg:top-[18%] top-[20%] w-[100%] flex items-center justify-center text-white font-bold">
          Your Career Path
        </span>

        <div className="absolute lg:top-[30%] top-[75%] md:top-[80%] w-[100%] flex items-center justify-center gap-3 flex-wrap">
          <button className="px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer" onClick={()=>navigate("/allcourses")}>
            View All Courses
          </button>
          <button className="px-[20px] py-[10px] lg:bg-white bg-black lg:text-black text-white rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer items-center justify-center">
            Search With Ai
            <img
              src={SearchAi}
              alt="ai"
              className="w-[25px] h-[25px] rounded-full"
            />
          </button>
        </div>
      </div>
      <Logo/>
      <ExploreCourses/>
      <CardPage/>
    </div>
  );
}

export default Home;

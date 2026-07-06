import React, { cloneElement } from "react";
import { useNavigate } from "react-router-dom";
import {
  TbDeviceDesktopAnalytics,
  TbVectorTriangle,
  TbDeviceMobile,
  TbShieldLock,
  TbBrain,
  TbChartDots,
  TbChartBar,
  TbTool,
} from "react-icons/tb";

const categories = [
  {
    label: "Web development",
    bg: "#fce7f3",
    color: "#be185d",
    icon: <TbDeviceDesktopAnalytics />,
  },
  {
    label: "UI UX designing",
    bg: "#e0f2fe",
    color: "#0369a1",
    icon: <TbVectorTriangle />,
  },
  {
    label: "App development",
    bg: "#fce7f3",
    color: "#be185d",
    icon: <TbDeviceMobile />,
  },
  {
    label: "Ethical hacking",
    bg: "#dcfce7",
    color: "#15803d",
    icon: <TbShieldLock />,
  },
  { label: "AI / ML", bg: "#f3e8ff", color: "#7e22ce", icon: <TbBrain /> },
  {
    label: "Data science",
    bg: "#fef9c3",
    color: "#854d0e",
    icon: <TbChartDots />,
  },
  {
    label: "Data analytics",
    bg: "#e0f2fe",
    color: "#0369a1",
    icon: <TbChartBar />,
  },
  { label: "AI tools", bg: "#f3e8ff", color: "#7e22ce", icon: <TbTool /> },
];

function ExploreCourses() {
  const navigate = useNavigate();

  return (
    <div className="w-full px-6 py-16 bg-white">
      <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* left text */}
        <div>
          <p className="text-[13px] text-gray-400 mb-2">what we offer</p>
          <h2 className="text-[32px] font-medium leading-snug mb-4">
            Explore
            <br />
            Our Courses
          </h2>
          <p className="text-[15px] text-gray-500 leading-relaxed mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem vel
            iure explicabo laboriosam accusantium expedita laudantium facere
            magnam.
          </p>
          <button
            onClick={() => navigate("/allcourses")}
            className="bg-black text-white px-7 py-3 rounded-xl text-[15px] flex items-center gap-2 cursor-pointer"
          >
            Explore courses →
          </button>
        </div>

        {/* right grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => navigate("/courses")}
              className="border border-gray-100 rounded-xl p-5 flex flex-col items-center gap-3 cursor-pointer hover:border-gray-300 transition-all"
            >
              <div
                className="w-[70px] h-[70px] rounded-lg flex items-center justify-center"
                style={{ background: cat.bg }}
              >
                {cloneElement(cat.icon, {
                  style: { color: cat.color, fontSize: "32px" },
                })}
              </div>
              <span className="text-[13px] text-gray-500 text-center leading-snug">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExploreCourses;

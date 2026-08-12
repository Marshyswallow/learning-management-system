import { cloneElement } from "react";
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
    <section className="w-full bg-white px-6 py-20">
      <div className="mx-auto max-w-[900px] grid grid-cols-1 gap-8 items-center md:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
            What we offer
          </p>
          <h2 className="mb-4 text-[32px] font-medium leading-snug">
            Explore
            <br />
            Our Courses
          </h2>
          <p className="mb-6 text-[15px] leading-relaxed text-gray-500">
            Learn from focused, practical content designed to help you make
            steady progress, one skill at a time.
          </p>
          <button
            onClick={() => navigate("/allcourses")}
            className="flex items-center gap-2 rounded-xl bg-black px-7 py-3 text-[15px] text-white"
          >
            Explore courses →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => navigate("/courses")}
              className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border border-gray-100 p-5 transition-all hover:border-gray-300"
            >
              <div
                className="flex h-[70px] w-[70px] items-center justify-center rounded-lg"
                style={{ background: cat.bg }}
              >
                {cloneElement(cat.icon, {
                  style: { color: cat.color, fontSize: "32px" },
                })}
              </div>
              <span className="text-center text-[13px] leading-snug text-gray-500">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExploreCourses;

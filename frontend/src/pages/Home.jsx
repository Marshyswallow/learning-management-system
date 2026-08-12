import Nav from "../component/Nav";
import home from "../assets/home1.jpg";
import Logo from "../component/Logos";
import ExploreCourses from "../component/ExploreCourses";
import CardPage from "../component/CardPage";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-hidden bg-[#fafafa] text-gray-900">
      <section className="relative min-h-[620px] overflow-hidden bg-gray-950">
        <Nav />
        <img
          src={home}
          alt="Students learning together"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/55 to-gray-950/20" />

        <div className="relative mx-auto flex min-h-[620px] max-w-6xl items-center px-6 pb-12 pt-28 sm:px-10 lg:px-12">
          <div className="max-w-2xl text-white">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.25em] text-white/70">
              Learn with purpose
            </p>
            <h1 className="max-w-xl text-4xl font-semibold leading-tight sm:text-6xl">
              Build skills that move you forward.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-white/75 sm:text-lg">
              Practical courses, clear lessons, and the confidence to take your
              next step in your career.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/allcourses")}
                className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-gray-950 transition hover:bg-gray-200"
              >
                Browse courses
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="rounded-lg border border-white/60 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                Start learning
              </button>
            </div>
          </div>
        </div>
      </section>

      <main>
        <div className="border-b border-gray-200 bg-white px-6 py-6 sm:px-10">
          <Logo />
        </div>
        <ExploreCourses />
        <CardPage />
      </main>
    </div>
  );
}

export default Home;

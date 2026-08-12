import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

function Footer() {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-12">
        <div className="max-w-xs">
          <img src={logo} alt="LMS logo" className="h-11 w-auto rounded-lg object-contain" />
          <p className="mt-5 text-sm leading-6 text-gray-400">
            Learn practical skills from clear, focused courses and take your next
            step with confidence.
          </p>
          <div className="mt-6 flex gap-3">
            {[FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube].map((Icon, index) => (
              <a
                key={index}
                href="#top"
                aria-label={`Social link ${index + 1}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition hover:border-white hover:text-white"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Explore</h2>
          <div className="mt-4 flex flex-col items-start gap-3 text-sm text-gray-400">
            <button onClick={() => goTo("/")} className="transition hover:text-white">Home</button>
            <button onClick={() => goTo("/allcourses")} className="transition hover:text-white">All courses</button>
            <button onClick={() => goTo("/allcourses")} className="transition hover:text-white">Categories</button>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Account</h2>
          <div className="mt-4 flex flex-col items-start gap-3 text-sm text-gray-400">
            <button onClick={() => goTo("/login")} className="transition hover:text-white">Log in</button>
            <button onClick={() => goTo("/signup")} className="transition hover:text-white">Create account</button>
            <button onClick={() => goTo("/profile")} className="transition hover:text-white">My profile</button>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Need help?</h2>
          <p className="mt-4 text-sm leading-6 text-gray-400">
            Have a question about a course or your account? We are here to help.
          </p>
          <a href="mailto:support@example.com" className="mt-4 inline-block text-sm text-white underline underline-offset-4">
            support@example.com
          </a>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-12">
          <span>© {new Date().getFullYear()} LMS. All rights reserved.</span>
          <div className="flex gap-5">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import netflixLogo from "../assets/Netflix_Logo_RGB.png";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b-2 py-2">
      <nav className="grid grid-cols-[200px_auto_200px] items-center gap-4">
        <section>
          <Link to="/browse">
            <img
              className="h-full w-full object-contain"
              src={netflixLogo}
              alt="Netflix Logo"
            />
          </Link>
        </section>
        <section className="text-sm text-gray-300">
          <ul>
            <li>
              <NavLink to="/browse">Home</NavLink>
            </li>
          </ul>
        </section>
        <section>secondary</section>
      </nav>
    </header>
  );
}

import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import { useState, useRef, useEffect } from "react";
import profileImage from "/src/assets/profile.png";

export default function ProfileMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const profileMenuContainer = useRef<HTMLSelectElement>(null);
  const timerId = useRef(0);
  function onMouseEnter() {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    setShowMenu(true);
  }
  function onMouseExit() {
    timerId.current = setTimeout(() => {
      setShowMenu(false);
    }, 300);
  }

  useEffect(() => {
    profileMenuContainer.current?.addEventListener("mouseenter", onMouseEnter);
    profileMenuContainer.current?.addEventListener("mouseleave", onMouseExit);

    return () => {
      profileMenuContainer.current?.removeEventListener(
        "mouseenter",
        onMouseEnter
      );
      profileMenuContainer.current?.removeEventListener(
        "mouseleave",
        onMouseExit
      );
    };
  }, []);

  return (
    <section className="relative " ref={profileMenuContainer}>
      <section className="flex items-center gap-2">
        <img
          src={profileImage}
          alt="user profile image"
          className="h-10 w-10 rounded-md"
        />
        <ChevronDownIcon
          style={{ strokeWidth: ".2rem" }}
          className={`h-6 w-6 transition-transform duration-200 ${
            showMenu ? "rotate-180" : ""
          }`}
        />
      </section>
      {showMenu ? (
        <ul className="absolute top-[60px] -left-24 flex w-[200px] flex-col justify-center gap-4 bg-dark px-4 py-2">
          <li>Username</li>
          <li>Manage Profiles</li>
          <li>Transfer Profiles</li>
          <li>Account</li>
          <li>Help Center</li>
          <li className="-mx-4 border-t border-t-gray-500 px-4 pt-2">
            Sign Out of Netflix
          </li>
        </ul>
      ) : null}
    </section>
  );
}

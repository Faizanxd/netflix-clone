import SearchIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { useState, useRef, useEffect, MouseEvent } from "react";

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const strokeWidth = { strokeWidth: ".2rem" };
  const inputRef = useRef<HTMLInputElement>(null);
  function handleOutsideClick(event: globalThis.MouseEvent) {
    if ((event.target as HTMLInputElement).id !== "searchbar") {
      setOpen(false);
    }
  }

  function toggleSearchBar(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    if (!open) {
      inputRef.current?.focus();
    }
    setOpen(!open);
  }
  useEffect(() => {
    if (open) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [open]);

  return (
    <section className="flex w-[300px] items-center justify-end overflow-hidden">
      <button
        className={`h-8 ${!open ? "visible w-8" : "invisible h-0 w-0"}`}
        onClick={toggleSearchBar}
      >
        <SearchIcon style={strokeWidth} />
      </button>
      <section
        className={`${
          open
            ? "w-full  animate-slide-rtl border border-white "
            : "invisible h-0 w-0"
        }flex items-center gap-2 bg-dark p-1`}
      >
        <button className="h-8 w-8">
          <SearchIcon style={strokeWidth} />
        </button>
        <input
          ref={inputRef}
          className="w-4 bg-dark  outline-none"
          type="text"
          name="searchbar"
          id="searchbar"
          placeholder="Titles, people, genres"
        />
      </section>
    </section>
  );
}

import { FormEvent } from "react";
import netflixLogo from "../assets/Netflix_Logo_RGB.png";

export default function Login() {
  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const { email, password } = event.target as any;
    console.log(email.value, password.value);
  }
  return (
    <>
      <header className="relative z-[1] w-56">
        <img src={netflixLogo} alt="Netflix Logo" className="h-full w-full" />
      </header>
      <main>
        <section
          className={`absolute top-0 left-0 -z-[1] min-h-screen w-full bg-[url("/login-background.jpg")] bg-cover`}
        ></section>
        <section className="absolute inset-0 bg-gradient-to-b from-zinc-900/50"></section>
        <form
          onSubmit={onSubmit}
          className="relative mx-auto min-h-[70vh] w-[450px] rounded-r-lg bg-black/75 p-16"
        >
          <article>
            <h1 className="mb-4 text-4xl">Sign In</h1>
            <section className="flex flex-col gap-4">
              <input
                type="email"
                name="email"
                id="email"
                className="rounded-md bg-zinc-500 p-2 text-gray-300"
              />
              <input
                type="password"
                name="password"
                id="password"
                className="rounded-md bg-zinc-500 p-2 text-gray-300"
              />
              <button className="my-8 rounded-md bg-netflixRed p-2 font-semibold">
                Sign In
              </button>
            </section>
            <p>New to Netflix? Sign Up Now</p>
          </article>
        </form>
      </main>
    </>
  );
}

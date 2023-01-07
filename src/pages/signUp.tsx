import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../common/auth";
import netflixLogo from "../assets/Netflix_Logo_RGB.png";

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  async function authenticateUser(event: React.SyntheticEvent) {
    const { email, password } = event.target as typeof event.target & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };

    event.preventDefault();
    const user = await signUp(email.value, password.value);
    if (user) {
      navigate("/login");
    }
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
          onSubmit={authenticateUser}
          className="relative mx-auto  w-[450px] rounded-r-lg bg-black/75 p-16"
        >
          <article className="text-gray-300">
            <h1 className="mb-4 text-4xl text-white">Sign Up</h1>
            <section className="flex flex-col gap-4">
              <input
                type="email"
                name="email"
                id="email"
                className="rounded-md bg-zinc-500 p-2  outline-none"
                placeholder="Enter Email"
              />
              <input
                type="password"
                name="password"
                id="password"
                className="rounded-md bg-zinc-500 p-2 text-gray-300 outline-none"
                placeholder="Enter Password"
              />
              <button className="my-8 rounded-md bg-netflixRed p-2 font-semibold text-white hover:bg-zinc-500/60">
                Sign Up
              </button>
            </section>
            <p>
              Already Have an account?
              <NavLink
                to={"/login"}
                className="p-2 font-bold hover:text-netflixRed"
              >
                Login
              </NavLink>{" "}
            </p>
          </article>
        </form>
      </main>
    </>
  );
}

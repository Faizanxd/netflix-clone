import {
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router";
import { lazy } from "react";
import React from "react";
import { createBrowserRouter, Link } from "react-router-dom";
const Browse = lazy(() => import("./pages/browse"));
const Layout = lazy(() => import("./components/layout"));
const Login = lazy(() => import("./pages/login"));
import { AuthProvider, useAuth } from "./common/auth";
const Profile = lazy(() => import("./pages/profile"));
import ProfilesProvider from "./common/profiles-context";
import SignUp from "./pages/signUp";
import Loader from "./components/loader";
const Movies = lazy(() => import("./pages/movies"));
const NewAndPopular = lazy(() => import("./pages/new and popular"));
const TvShows = lazy(() => import("./pages/Tv Shows"));

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { user, loading } = useAuth();
  if (!user && !loading) {
    return <Navigate to="/login" />;
  }
  return children;
}

function RouteError() {
  return (
    <article className="grid place-content-center gap-2 p-4">
      <h1 className="text-4xl">The page you're looking for doesn't exist.</h1>
      <p className="text-2xl">
        Browse more content
        <Link to="/browse" className="p-2 font-semibold hover:text-netflixRed">
          Here!
        </Link>
      </p>
    </article>
  );
}

function AppRouter() {
  const { loading, user } = useAuth();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
          errorElement={<RouteError />}
        >
          <Route index element={<Profile />} />
          <Route path="ManageProfiles" element={<Profile edit />} />
          <Route path="browse" element={<Layout />}>
            <Route index element={<Browse />} />
          </Route>
          <Route path="New&popular" element={<Layout />}>
            <Route index element={<NewAndPopular />} />
          </Route>
          <Route path="Tv" element={<Layout />}>
            <Route index element={<TvShows />} />
          </Route>
          <Route path="Movies" element={<Layout />}>
            <Route index element={<Movies />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </>
    )
  );
  return loading && !user ? (
    <Loader />
  ) : (
    <React.Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </React.Suspense>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProfilesProvider>
        <AppRouter />
      </ProfilesProvider>
    </AuthProvider>
  );
}

import {
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Browse from "./pages/browse";
import Layout from "./components/layout";
import Login from "./pages/login";
import { AuthProvider, useAuth } from "./common/auth";
import Profile from "./pages/profile";
import ProfilesProvider from "./common/profiles-context";

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { user, loading } = useAuth();
  // if (!user && !loading) {
  //   return <Navigate to="/login" />;
  // }
  return children;
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
        >
          <Route index element={<Profile />} />
          <Route path="ManageProfiles" element={<Profile edit />} />
          <Route path="browse" element={<Layout />}>
            <Route index element={<Browse />} />
          </Route>
          <Route path="latest" element={<Layout />}>
            <Route index element={<h1>latest</h1>} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </>
    )
  );
  return loading && !user ? (
    <section className="grid h-screen w-screen place-items-center text-6xl">
      Loading
    </section>
  ) : (
    <RouterProvider router={router} />
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

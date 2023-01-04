import { createRoutesFromElements, Route, RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Browse from "./pages/browse";
import Layout from "./components/layout";
import Login from "./pages/login";

function AppRouter() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<h1>default!</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/browse" element={<Layout />}>
          <Route index element={<Browse />} />
        </Route>
        <Route path="/latest" element={<Layout />}>
          <Route index element={<h1>latest</h1>} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default function App() {
  return <AppRouter />;
}

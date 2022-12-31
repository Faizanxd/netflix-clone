import { createRoutesFromElements, Route, RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Browse from "./components/browse";
import Layout from "./components/layout";

function AppRouter() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<h1>default!</h1>} />
        <Route path="/login" element={<h2>login</h2>} />
        <Route path="/browse" element={<Layout />}>
          <Route index element={<Browse />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default function App() {
  return <AppRouter />;
}

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

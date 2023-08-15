import Error from "./Error";
import Stock from "./Stock";
import Menu from "./Menu";
import Home from "./Home";
import News from "./News";
import Graph from "./Graph";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  let router = createBrowserRouter(
    [
      { path: "/", element: <Home />, errorElement: <Error /> },
      { path: "/stock", element: <Stock /> },
      // { path: "/news", element: <News /> },
      { path: "/graph", element: <Graph /> },
    ],
    { basename: "/" }
  );

  return (
    <div>
      <Menu />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

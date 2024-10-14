// rrd imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import Dashboard, { dashboardLoader } from "@/pages/Dashboard";
import Error from "@/pages/Error";

// layouts
import Main, { mainLoader } from "@/layouts/Main";

// hooks
import useDocumentTitle from "./hooks/useDocumentTitle";

// constants
import { SiteConfig } from '@/constants';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard/>,
        loader: dashboardLoader,
        errorElement: <Error />,
      },
      {
        path: 'logout',
        element: <p>logged out!</p>
      }
    ]
  },
]);

function App() {
  useDocumentTitle({
    title: SiteConfig.companyName,
  });

  return (
    <div className="App">
      <RouterProvider router={router} />    
    </div>
  );
}

export default App;
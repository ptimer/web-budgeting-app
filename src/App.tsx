// rrd imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// library
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// pages
import Dashboard, { dashboardAction, dashboardLoader } from "@/pages/Dashboard";
import Error from "@/pages/Error";

// layouts
import Main, { mainLoader } from "@/layouts/Main";

// hooks
import useDocumentTitle from "@/hooks/useDocumentTitle";

// constants
import { SiteConfig } from '@/constants';

// actions
import { logoutAction } from "@/actions/logout";

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
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: 'logout',
        action: logoutAction,
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
      <ToastContainer />
    </div>
  );
}

export default App;
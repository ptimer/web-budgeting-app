// rrd imports
import { createHashRouter, RouterProvider } from "react-router-dom";

// library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// pages
import Dashboard, { dashboardAction, dashboardLoader } from "@/pages/Dashboard";
import Error from "@/pages/Error";
import ExpensesPage, { expensesAction, expensesLoader } from "@/pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "@/pages/BudgetPage";

// components
import Ribbon from "@/components/Ribbon";

// layouts
import Main, { mainLoader } from "@/layouts/Main";

// hooks
import useDocumentTitle from "@/hooks/useDocumentTitle";

// constants
import { SiteConfig } from "@/common/constants";

// actions
import { logoutAction } from "@/actions/logout";
import { deleteBudgetAction } from "@/actions/deleteBudget";

const router = createHashRouter([
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
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        errorElement: <Error />,
        action: budgetAction,
        children: [
          {
            path: "delete",
            action: deleteBudgetAction,
          }
        ]
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />,
      },
      {
        path: "logout",
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
      <Ribbon
        position="right-bottom"
        title="View Source on GitHub"
        url={SiteConfig.repositoryUrl}
        baseColour="dark-gray"
      />
    </div>
  );
}

export default App;
// rrd
import { useLoaderData } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helpers
import { createBudget, createExpense, fetchData } from "@/common/helpers";

// types
import { AppData, APP_DATA_KEYS } from "@/common/types";

// components
import Intro from "@/components/Intro";
import AddBudgetForm from "@/components/AddBudgetForm";
import AddExpenseForm from "@/components/AddExpenseForm";

// loader
export function dashboardLoader() {
    const userName = fetchData(APP_DATA_KEYS.userName);
    const budgets = fetchData(APP_DATA_KEYS.budgets);

    return { userName, budgets };
}

// action
export async function dashboardAction({ request }: any) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  
  if (_action === "newUser") {
    try {
      localStorage.setItem(APP_DATA_KEYS.userName, JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e: any) {
      throw new Error("There was a problem creating your account.");
    }
  };

  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });

      return toast.success("Budget created!");
    } catch (e: any) {
      throw new Error("There was a problem creating your budget.");
    }
  };

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });

      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e: any) {
      throw new Error("There was a problem creating your expense.");
    }
  };
}

const Dashboard = () => {
  const { userName, budgets } = useLoaderData() as AppData;

  return (
    <>
      { userName ? (
        <div className="dashboard">
          <h1>Welcome back, <span className="accent">{userName}</span></h1>
          <div className="grid-sm">
            { budgets && budgets.length > 0 
                ? (
                  <div className="grid-lg">
                    <div className="flex-lg">
                      <AddBudgetForm />
                      <AddExpenseForm budgets={budgets} />
                    </div>
                  </div>
                ) : (
                  <div className="grid-sm">
                    <p>Personal budgeting is the secret to financial freedom.</p>
                    <p>Create a budget to get started!</p>
                    <AddBudgetForm />
                  </div>
                )}
          </div>
        </div>
      ) : <Intro />}
    </>
  )
}

export default Dashboard;

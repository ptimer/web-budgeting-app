// rrd
import { useLoaderData } from "react-router-dom";

// library
import { toast } from "react-toastify";

// types
import { APP_DATA_KEYS, AppData, Expense } from "@/common/types";

// helpers
import { deleteItem, fetchData, wait } from "@/common/helpers";

// components
import Table from "@/components/Table";

// loader
export function expensesLoader() {
  const expenses = fetchData<Expense[]>(APP_DATA_KEYS.expenses, []);

  return { expenses };
}

// action
export async function expensesAction({ request }: any) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteExpense") {
    await wait(300);

    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });

      return toast.success("Expense deleted!");
    } catch (e: any) {
      throw new Error("There was a problem deleting your expense.");
    }
  };
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData() as AppData;

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {
        expenses.length > 0 
        ? (
          <div className="grid-md">
            <h2>
              Recent Expenses <small>({ expenses.length} total)</small>
            </h2>
            <Table expenses={expenses} />
          </div>
        ) : <p>No expenses to show</p>
      }
    </div>
  )
}

export default ExpensesPage
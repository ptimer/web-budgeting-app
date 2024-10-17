import { CSSProperties } from "react";

// rrd
import { Link, useFetcher } from "react-router-dom";

// library
import { TrashIcon } from "@heroicons/react/20/solid";

// types
import { Expense } from "@/common/types";

// helpers
import { formatCurrency, formatDateToLocaleString, getAllMatchingItems } from "@/common/helpers";

interface Props {
    expense: Expense;
}

const ExpenseItem = ({ expense }: Props) => {
  const fetcher = useFetcher();

  const isSubmitting = fetcher.state === "submitting";
  
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];

  const composeExpenseItemStyle = () => {
    const style = {
        "--accent": budget.color
    };

    return style as CSSProperties & { [key: string]: string }
}

  return (
    <>
        <td>{expense.name}</td>
        <td>{formatCurrency(expense.amount)}</td>
        <td>{formatDateToLocaleString(expense.createdAt)}</td>
        <td>
          <Link 
            to={`/budget/${budget.id}`}
            style={composeExpenseItemStyle()}
          >
            {budget.name}
          </Link>
        </td>
        <td>
          <fetcher.Form method="post">
              <input type="hidden" name="_action" value="deleteExpense" />
              <input type="hidden" name="expenseId" value={expense.id} />
              <button
                  type="submit"
                  className="btn btn--warning"
                  aria-label={`Delete ${expense.name} expense`}
                  disabled={isSubmitting}
              >
                <TrashIcon width={20} />
              </button>
          </fetcher.Form>
        </td>
    </>
  )
}

export default ExpenseItem
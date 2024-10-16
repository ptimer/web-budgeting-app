// types
import { Expense } from "@/common/types";

// helpers
import { formatCurrency, formatDateToLocaleString } from "@/common/helpers";

interface Props {
    expense: Expense;
}

const ExpenseItem = ({ expense }: Props) => {
  return (
    <>
        <td>{expense.name}</td>
        <td>{formatCurrency(expense.amount)}</td>
        <td>{formatDateToLocaleString(expense.createdAt)}</td>
    </>
  )
}

export default ExpenseItem
// types
import { Expense } from "@/common/types"

// components
import ExpenseItem from "@/components/ExpenseItem";

interface Props {
    expenses: Expense[];
}

const Table = ({ expenses }: Props) => {
    const cols = ["Name", "Amount", "Date"];

    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {
                            cols.map((col, idx) => (
                                <th key={idx}>{col}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        expenses.map(expense => (
                            <tr key={expense.id}>
                                <ExpenseItem expense={expense} />
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table
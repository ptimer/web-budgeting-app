import { useEffect, useRef } from "react";

// rrd imports
import { useFetcher } from "react-router-dom";

// types imports
import { Budget } from "@/common/types"

// library imports
import { PlusCircleIcon } from "@heroicons/react/20/solid";

interface Props {
    budgets: Budget[];
}

const AddExpenseForm = ({ budgets }:Props) => {
    const isSingleBudget = budgets.length === 1;

    const fetcher = useFetcher();

    const isSubmitting = fetcher.state === "submitting";

    const formRef = useRef<any>();
    const focusRef = useRef<any>();

    useEffect(() => {
        if (!isSubmitting) {
            formRef.current.reset();
            focusRef.current.focus();
        }
    }, [isSubmitting]);

    const composeCategoriesSelect = () => {
        const sortedBudgets = budgets.sort((a, b) => +a.createdAt - +b.createdAt);

        const composeBudgetOption = (budget: Budget) => (
            <option
                key={budget.id}
                value={budget.id}
            >
                { budget.name }
            </option>
        )

        return (
            <select 
                name="newExpenseBudget" 
                id="newExpenseBudget"
                required
            >
                { sortedBudgets.map(composeBudgetOption) }
            </select>
        )
    };

    const composeCreateExpenseButton = () => {
        return (
            <button 
                type="submit" 
                className="btn btn--dark" 
                disabled={isSubmitting}
            >
                { isSubmitting ? <span>Submitting...</span>
                : (
                    <>
                        <span>Add Expense</span>
                        <PlusCircleIcon width={20} />
                    </>
                  )}
            </button>
        )
    };

    return (
        <div className="form-wrapper">
            <h2 className="h3">Add New{" "} 
                <span className="accent">
                    {isSingleBudget && `${budgets.map(budget => budget.name)}`}
                </span>{" "}
                Expense
            </h2>
            <fetcher.Form
                method="post"
                className="grid-sm"
                ref={formRef}
            >
                <div className="expense-inputs">
                    <div className="grid-xs">
                        <label htmlFor="newExpense">Expense Name</label>
                        <input 
                            type="text" 
                            id="newExpense"
                            name="newExpense"
                            placeholder="e.g., Coffee"
                            ref={focusRef}
                            required
                        />
                    </div>
                    <div className="grid-xs">
                        <label htmlFor="newExpenseAmount">Amount</label>
                        <input 
                            type="number"
                            step="0.01"
                            inputMode="decimal"
                            name="newExpenseAmount"
                            id="newExpenseAmount"
                            placeholder="e.g., 3.50"
                            required
                        />
                    </div>
                    <div className="grid-xs" hidden={isSingleBudget}>
                        <label htmlFor="newExpenseBudget">
                            Budget Category
                        </label>
                        { composeCategoriesSelect() }
                    </div>
                </div>
                <input type="hidden" name="_action" value="createExpense" />
                { composeCreateExpenseButton() }
            </fetcher.Form>
        </div>
    )
}

export default AddExpenseForm